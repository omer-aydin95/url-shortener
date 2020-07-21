import AppConstants from "./constants/AppConstants";
import APP from "./app";

APP.listen(AppConstants.APP_PORT, () => {
    console.info(`App is listening the port ${AppConstants.APP_PORT}`);
});
