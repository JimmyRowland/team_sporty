import { ReactNode } from "react";

export type Colors = "red" | "blue" | "indigo" | "green";
export type Month = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "June" | "July" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
export const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export interface EventListItemType {
    date: Date;
    title: string;
    body: string;
}
export interface ListItemProps {
    title: string;
    href: string;
    icon: ReactNode;
}
