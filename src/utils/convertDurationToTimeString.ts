export function convertDurationToTimeString(duration: number) {
    // exemplo convertendo segundos em horas, e a função Math.floor() arredonda para baixo
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60); //quantos minutos sobram da divisão em cima (horas) e converto para minutos
    const seconds = duration % 60;

    //Se a hora tiver 1h ele adiciona no inicio (padStart) o '0'
    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':');

    return timeString;
}