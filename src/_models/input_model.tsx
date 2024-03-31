export interface InputModel {
    class_name: string;
    form_label: string;
    key_name: string;
    list: any[];
    min: number;
    multiple: boolean;
    required: boolean;
    set_data: (data: any, key: string) => void;
    step: number;
    type: string;
    value: any;
}