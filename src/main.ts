import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;
  
  const formEl = document.getElementById("itemEntryForm") as HTMLFormElement;
  formEl.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    const entryInputEl = document.getElementById("newItem") as HTMLInputElement;
    const newEntry = entryInputEl.value.trim();
    if (!newEntry) return;
    const id: number = fullList.list.length ? fullList.list.length : 1;
    const newItem = new ListItem(id.toString(), newEntry);
    fullList.addItem(newItem);
    template.render(fullList);
  });

  const clearBtn = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearBtn.addEventListener("click", (): void => {
    template.clear();
    fullList.clearList();
  });

  fullList.load();
  template.render(fullList);
};
document.addEventListener("DOMContentLoaded", initApp);
