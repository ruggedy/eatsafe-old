export class Restaurant {
    constructor(
        public name: string,
        public address1: string,
        public address2: string,
        public postcode: string,
        public city: string,
        public day: string[],
        public start: number[],
        public end: number[],
        public email: string,
        public phone: string
    ) {}
}