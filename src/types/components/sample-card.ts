export interface ISampleCardProps {
  title?: string;
  contexts: string;
  onAction?: () => void;
  node: React.ReactNode;
}
