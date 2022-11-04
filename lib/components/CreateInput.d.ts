import { VendorConfiguration } from '../types';
export interface InputProps {
}
declare const CreateInput: (vendorConfig: VendorConfiguration) => {
    new (props: any): {
        _input: any;
        setInput: (input: any) => void;
        focus: () => void;
        render(): any;
    };
};
export default CreateInput;
