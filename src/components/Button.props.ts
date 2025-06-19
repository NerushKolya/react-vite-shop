import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}