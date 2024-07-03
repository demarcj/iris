import { LanguageToggleMap } from "@/_constants/locale"

export interface InputModel {
    class_name: string;
    disabled: boolean;
    display: boolean;
    form_label: string;
    hint: string;
    key_name: string;
    handle_image: (event: any, type: boolean) => void;
    language: keyof typeof LanguageToggleMap;
    list: any[];
    min: number;
    multiple: boolean;
    required: boolean;
    set_data: (data: any, key: string) => void;
    step: number;
    type: string;
    value: any;
}