import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Phone } from 'lucide-react';

interface ContactLead {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  message: string;
  status: string;
  created_at: string;
}

export function ContactLeadsManager() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch contact leads',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-500';
      case 'contacted':
        return 'bg-yellow-500';
      case 'converted':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div>Loading contact leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Leads</h2>
        <div className="text-sm text-muted-foreground">
          Total leads: {leads.length}
        </div>
      </div>

      <div className="grid gap-4">
        {leads.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No contact leads yet.</p>
            </CardContent>
          </Card>
        ) : (
          leads.map((lead) => (
            <Card key={lead.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{lead.name}</h3>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" />
                        <a 
                          href={`mailto:${lead.email}`}
                          className="text-primary hover:underline"
                        >
                          {lead.email}
                        </a>
                      </div>
                      
                      {lead.whatsapp && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          <a 
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {lead.whatsapp}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="bg-muted p-3 rounded-lg mb-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{lead.message}</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Received: {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}