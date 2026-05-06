'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/logo';
import { Menu, Download, FileText } from 'lucide-react';

interface Document {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  size: string;
}

export default function DocumentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const [documents] = useState<Document[]>([
    {
      id: '1',
      fileName: 'Bank Statement March 2026',
      fileType: 'PDF',
      uploadDate: '2026-03-08',
      size: '2.4 MB',
    },
    {
      id: '2',
      fileName: 'Investment Portfolio',
      fileType: 'PDF',
      uploadDate: '2026-03-07',
      size: '1.8 MB',
    },
    {
      id: '3',
      fileName: 'Insurance Documents',
      fileType: 'PDF',
      uploadDate: '2026-03-05',
      size: '3.2 MB',
    },
    {
      id: '4',
      fileName: 'Property Deed',
      fileType: 'PDF',
      uploadDate: '2026-03-08',
      size: '4.1 MB',
    },
    {
      id: '5',
      fileName: 'Will and Testament',
      fileType: 'PDF',
      uploadDate: '2026-03-06',
      size: '2.9 MB',
    },
    {
      id: '6',
      fileName: 'Tax Returns 2025',
      fileType: 'PDF',
      uploadDate: '2026-03-04',
      size: '1.5 MB',
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} currentPage="assets" />

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-primary text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Documents</h1>
                <p className="text-white/80 text-sm mt-1">Access and manage your important documents</p>
              </div>
            </div>
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Documents</h2>
            <p className="text-muted-foreground">All your important documents in one secure place</p>
          </div>

          {documents.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No documents uploaded yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/40 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{doc.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.fileType} • {doc.size} • Uploaded: {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-30 p-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
}
