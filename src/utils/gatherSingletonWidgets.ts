const singletonIds = ["ContextMenu", "Desktop", "StartMenu", "Taskbar"] as const;

export const gatherSingletonWidgets = () => {
  const singletons: HTMLElement[] = [];

  for (const id of singletonIds) {
    const result = document.getElementById(id);

    if (result) {
      singletons.push(result);
    } else {
      console.error(`"${id}" was null!`);
    }
  }

  if (singletons.length !== singletonIds.length) {
    console.warn(`Expected ${singletonIds.length} singletons, found ${singletons.length} singletons!`);
  }

  return singletons;
};
