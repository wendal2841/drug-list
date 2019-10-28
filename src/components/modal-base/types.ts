export interface IPropsModalBase {
    isOpen: boolean;
    header: string | JSX.Element;
    className?: string;
    onClose(): void;
}
