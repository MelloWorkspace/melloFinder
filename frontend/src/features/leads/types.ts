export type LeadStatus =
	| "new"
	| "contacted"
	| "qualified"
	| "lost"
	| "customer";

export interface Lead {
	id: string;
	name: string;
	email: string;
	status: LeadStatus;
	createdAt: string;
	company: string;
	phone: string;
	tags: Array<string>;
}

export interface LeadFilter {
	name?: string;
	email?: string;
	status?: LeadStatus;
	createdAtFrom?: string;
	createdAtTo?: string;
	company?: string;
	phone?: string;
	tags?: Array<string>;
}
