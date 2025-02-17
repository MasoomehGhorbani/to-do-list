import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
  clearList(): void;
  save(): void;
  load(): void;
}

export default class FullList implements List {
 static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}
  get list(): ListItem[] {
    return this._list;
  }
  set list(list: ListItem[]) {
    this._list = list;
  }
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }
  removeItem(id: string): void {
    this._list = this._list.filter((e) => e.id != id);
    this.save();
  }
  clearList(): void {
    this._list = [];
    this.save();
  }
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  load(): void {
    const storedItem: string | null = localStorage.getItem("myList");
    if (typeof storedItem !== "string") return;
    const parsedList: { _id: string; _content: string; _isChecked: boolean }[] =
      JSON.parse(storedItem);
    parsedList.forEach((li) => {
      const newListItem = new ListItem(li._id, li._content, li._isChecked);
      FullList.instance.addItem(newListItem)
    });
  }
}
