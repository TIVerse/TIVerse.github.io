import { getAllResearchDocuments } from '@/lib/research';
import ResearchClientPage from './research-client';

export default async function ResearchPage() {
  const documents = await getAllResearchDocuments();
  
  return <ResearchClientPage initialDocuments={documents} />;
}
