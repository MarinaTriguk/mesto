const photo01 = new URL('../images/photo-01.jpg', import.meta.url);
const photo02 = new URL('../images/photo-02.jpg', import.meta.url);
const photo03 = new URL('../images/photo-03.jpg', import.meta.url);
const photo04 = new URL('../images/photo-04.jpg', import.meta.url);
const photo05 = new URL('../images/photo-05.jpg', import.meta.url);
const photo06 = new URL('../images/photo-06.jpg', import.meta.url);

export const initialCards = [
    {
        name: 'Побережье',
        link: photo01
    },
    {
        name: 'Песчаные дюны',
        link: photo02
    },
    {
        name: 'Осенний каньон',
        link: photo03
    },
    {
        name: 'Дикий пляж',
        link: photo04
    },
    {
        name: 'Мост на закате',
        link: photo05
    },
    {
        name: 'Скалистый берег',
        link: photo06
    },
];