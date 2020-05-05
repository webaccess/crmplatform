import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import pluginId from "../../pluginId";
import { request } from "strapi-helper-plugin";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* generateRoutes() {
  try {
    const data = yield call(request, `/${pluginId}/generateRoutes`, {
      method: "GET",
    });

    strapi.notification.success("routes updated successfully!!");
  } catch (error) {
    strapi.notification.error(error.message);
  }
}

function* actionWatcher() {
  yield takeLatest("ROUTE_FETCH_REQUESTED", generateRoutes);
}
export default function* routeSaga() {
  yield all([fork(actionWatcher)]);
}

// export default routeSaga;
