-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Admins can update contact leads" ON public.contact_leads;
DROP POLICY IF EXISTS "Admins can delete contact leads" ON public.contact_leads;

-- Create policies for admins to update and delete contact leads
CREATE POLICY "Admins can update contact leads" 
ON public.contact_leads
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact leads" 
ON public.contact_leads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));