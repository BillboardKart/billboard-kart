// types/form.ts
export interface OptionItem {
  id: string;
  label: string;
  description?: string;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
}
