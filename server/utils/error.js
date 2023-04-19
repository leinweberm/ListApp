const errorLogger = (e, returnMessage = false) => {
	let internal = '';
	let public = '';

	if (e.name) {
		internal += `Error: ${e.name} \n`;
		public += `Error: ${e.name} \n`;
	}
	if (e.message) {
		internal += `Message: ${e.message} \n`;
		public += `Message: ${e.message} \n`;
	}
	if (e.stack) {
		internal += `Stack: ${e.stack} \n`;
	}

	internal = internal.trim();
	public = public.trim();
	
	if (returnMessage) {
		return { internalMessage: internal, publicMessage: public };
	} else {
		console.log(internal);
	}
};

const routeError = (req, error) => {
	req.send(error).status(400);
};

module.exports = { errorLogger, routeError };