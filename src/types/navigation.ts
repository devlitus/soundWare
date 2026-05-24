export type TabName = 'player' | 'library' | 'explore' | 'playlists';

export interface TabItem {
  name: TabName;
  label: string;
  icon: { ios: string; android: string; web: string };
}
