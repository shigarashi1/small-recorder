export interface IDialogBase {
  hasOpen: boolean;
  title: string;
  context: string;
  onClose: () => void;
}

export type TInfoDialog = IDialogBase;
export type TOkCancelDialog = IDialogBase & {
  onOk: () => void;
  onCancel: () => void;
};
export type TYesNoDialog = IDialogBase & {
  onYes: () => void;
  onNo: () => void;
};
