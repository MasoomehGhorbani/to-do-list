import FullList from "../model/FullList";

interface DOM {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOM {
  ul: HTMLUListElement;
  static instance: ListTemplate = new ListTemplate();
  private constructor() {
    this.ul = document.querySelector("#listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((li) => {
      const listItem = document.createElement("li") as HTMLLIElement;
      listItem.className="item"
      

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = li.id;
      check.checked=li.isChecked
      listItem.append(check);

      check.addEventListener('change',()=>{
        li.isChecked=!li.isChecked
        fullList.save()
      })

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = li.id;
      label.innerText = li.content;
      listItem.append(label);

      const btn = document.createElement("button") as HTMLButtonElement;
      btn.classList.add("button");
      btn.textContent = "x";
      listItem.append(btn);
      
      btn.addEventListener('click',()=>{
        fullList.removeItem(li.id)
        this.render(fullList)
      })
      
      this.ul.append(listItem);
    });
  }
}
