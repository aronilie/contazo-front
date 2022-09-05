import ButtonStyled from "./ButtonStyled";

interface ButtonProps {
  className: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  text: string;
}

const Button = ({
  className,
  type,
  disabled,
  text,
}: ButtonProps): JSX.Element => {
  return (
    <ButtonStyled className={className} type={type} disabled={disabled}>
      {text}
    </ButtonStyled>
  );
};

export default Button;
