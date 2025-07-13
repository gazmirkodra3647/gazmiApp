export interface PopoverHeaderProps extends HeaderBaseStyleUtilityProps {
  children?: React.ReactNode;
  className?: string;
  onBack?: () => void;
  backButtonProps?: ButtonIconProps<'button'>;
  startAccessory?: React.ReactNode | (onBack: () => void) extends never ? null : ButtonIcon<'button'>;
  onClose?: () => void;
  closeButtonProps?: ButtonIconProps<'button'>;
  endAccessory?: React.ReactNode | (onClose: () => void) extends never ? null : ButtonIcon<'button'>;
