
export type Days = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'sunday' | 'saturday';

export class Schedule {
    day?: Days;
    dayWeek?: number;
    from?: { hour: number, minute: number };
    to?: { hour: number, minute: number };
}
