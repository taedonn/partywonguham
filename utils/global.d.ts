export interface Partywon {
    name: string
}

export interface Table {
    date: string | Date,
    times: Time[]
}

export interface Time {
    time: number,
    selected: string[]
}

export interface State {
    type: string,
    msg: string
}