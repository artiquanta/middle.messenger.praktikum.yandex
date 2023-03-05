import Store from '../services/Store/Store';

class MainController {
  initialFilling() {
    const isDarkTheme = Store.getState().theme;
    if (isDarkTheme) {
      document.getElementById('root')?.classList.add('theme_dark');
    }
  }

  changeTheme(evt: Event) {
    const root = document.getElementById('root')!;
    const target: HTMLDivElement = evt.target as HTMLDivElement;
    root.classList.toggle('theme_dark');
    target.classList.toggle('profile__theme-change_theme_dark');
    const isDarkTheme = root.classList.contains('theme_dark');
    Store.set('theme', isDarkTheme, true);
  }
}

export default MainController;
