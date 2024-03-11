import { DialogHTMLAttributes, ReactNode } from 'react';

// Components
import Header from './components/atoms/header';
import Body from './components/atoms/body';
import Footer from './components/atoms/footer';

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  className?: string;
}

function Modal(props: ModalProps) {
  const { children, className, open, ...rest } = props;
  console.log(open);

  return (
    open && (
      <dialog
        className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-45 backdrop-blur z-50
      overflow-auto flex justify-center items-center"
        {...rest}
      >
        <div
          className={`m-auto bg-gray-900 border-gray-800 shadow-2xl text-white rounded-sm border ${className}`}
        >
          {children}
        </div>
      </dialog>
    )
  );
}

export default Modal;

export { Header as ModalHeader, Body as ModalBody, Footer as ModalFooter };
