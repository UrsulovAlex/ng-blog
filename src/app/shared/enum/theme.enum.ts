interface IThemeConfig {
    class: string,
    href: string,
}

export enum Theme {
    SECOND_THEME,
}

export enum ThemeClass {
    SECOND_THEME = 'second-theme',
}

export enum ThemeHref {
    SECOND_THEME = 'src/styles/second-theme.scss',
}


export const THEME_CONFIG: Record<Theme, IThemeConfig> = {
    [Theme.SECOND_THEME]: {class: ThemeClass.SECOND_THEME, href: ThemeHref.SECOND_THEME},
}