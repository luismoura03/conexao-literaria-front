import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  function notifySucess({
    message,
    color = "positive",
    icon = "done",
    position = "bottom-right",
  }) {
    $q.notify({
      message,
      color,
      icon,
      position,
    });
  }
  function notifyInfo({
    message,
    color = "blue",
    icon = "info",
    position = "bottom-right",
  }) {
    $q.notify({
      message,
      color,
      icon,
      position,
    });
  }
  function notifyError({
    message,
    color = "negative",
    icon = "warning",
    position = "bottom-right",
  }) {
    $q.notify({
      message,
      color,
      icon,
      position,
    });
  }
  function notifyWarning({
    message,
    color = "warning",
    icon = "warning",
    position = "bottom-right",
  }) {
    $q.notify({
      message,
      color,
      icon,
      position,
    });
  }
  return {
    notifySucess,
    notifyInfo,
    notifyError,
    notifyWarning,
  };
}
