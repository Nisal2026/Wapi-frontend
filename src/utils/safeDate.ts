import { format, parseISO, isValid } from "date-fns";

export const safeParseDate = (dateStr: string | null | undefined): Date => {
    if (!dateStr) return new Date();

    let date = new Date(dateStr);

    if (!isValid(date) && typeof dateStr === "string") {
        const isoStr = dateStr.replace(" ", "T");
        date = new Date(isoStr);
    }

    if (!isValid(date) && typeof dateStr === "string") {
        date = parseISO(dateStr);
    }

    return isValid(date) ? date : new Date();
};

export const safeFormat = (date: string | Date | null | undefined, formatStr: string, fallback: string = ""): string => {
    try {
        const parsedDate = typeof date === "string" ? safeParseDate(date) : date;

        if (!parsedDate || !isValid(parsedDate)) {
            return fallback;
        }

        return format(parsedDate, formatStr);
    } catch (error) {
        console.error("Date formatting error:", error);
        return fallback;
    }
};
