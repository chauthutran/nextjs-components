
export type JSONObject = { [key: string]: any };

export interface MonthType {
	id: number;
	name: string;
}



export interface EventType {
	title: string;
	start: Date;
	end: Date;
	color?: string;
}
