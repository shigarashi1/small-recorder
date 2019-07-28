export interface IDialogBase {
  hasOpen: boolean;
  onClose: () => void;
}

export interface IInformationDialog {
  hasOpen: boolean;
  contexts: string;
  title?: string;
  actionName?: string;
  onAction?: () => void;
}
