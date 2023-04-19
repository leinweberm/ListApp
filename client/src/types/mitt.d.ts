import { Emitter } from "mitt";

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		emitter: Emitter<any>
	}
}