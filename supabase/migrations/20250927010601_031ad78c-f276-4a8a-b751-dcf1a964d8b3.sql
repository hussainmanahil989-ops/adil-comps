-- Add admin role to the user who just logged in
INSERT INTO public.user_roles (user_id, role) 
VALUES ('6a2f03f0-adec-49b7-bbcb-a1e6ccbc353a', 'admin'::app_role) 
ON CONFLICT (user_id, role) DO NOTHING;