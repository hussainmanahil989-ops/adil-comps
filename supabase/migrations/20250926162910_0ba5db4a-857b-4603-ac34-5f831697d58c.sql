-- Add RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all user roles" 
ON public.user_roles FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));