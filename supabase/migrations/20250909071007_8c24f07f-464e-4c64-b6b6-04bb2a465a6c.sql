-- Add missing RLS policies for tables that were flagged

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization" ON public.organizations
  FOR SELECT USING (id = public.get_user_organization(auth.uid()));

CREATE POLICY "Admins can manage organizations" ON public.organizations
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for classes  
CREATE POLICY "Students can view their enrolled classes" ON public.classes
  FOR SELECT USING (
    id IN (
      SELECT class_id FROM public.class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Teachers can view classes in their organization" ON public.classes
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' AND
    organization_id = public.get_user_organization(auth.uid())
  );

CREATE POLICY "Teachers can manage their assigned classes" ON public.classes
  FOR ALL USING (
    teacher_id = auth.uid() OR
    (public.get_user_role(auth.uid()) IN ('admin', 'super_admin') AND 
     organization_id = public.get_user_organization(auth.uid()))
  );

-- RLS Policies for class_enrollments
CREATE POLICY "Students can view their own enrollments" ON public.class_enrollments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can view enrollments for their classes" ON public.class_enrollments
  FOR SELECT USING (
    class_id IN (
      SELECT id FROM public.classes 
      WHERE teacher_id = auth.uid() OR organization_id = public.get_user_organization(auth.uid())
    )
  );

CREATE POLICY "Admins can manage enrollments in their organization" ON public.class_enrollments
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'super_admin') AND
    class_id IN (
      SELECT id FROM public.classes 
      WHERE organization_id = public.get_user_organization(auth.uid())
    )
  );

-- Fix the function with proper search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;