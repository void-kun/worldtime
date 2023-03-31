import Timeline from '@/models/Timeline';
import Timezone from '@/models/Timezone';

export class LocalStore {
  public setTimeline(timeline: Timezone[]): void {
    this.set('t', JSON.stringify(timeline));
  }

  public getTimeline(): Timeline[] {
    return this.get('t');
  }

  public setHome(home: Timezone): void {
    this.set('h', JSON.stringify(home));
  }

  public getHome(): Timezone {
    return this.get('h');
  }

  private set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private get(key: string) {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);

    return null;
  }
}

const localStore = new LocalStore();
export default localStore;
