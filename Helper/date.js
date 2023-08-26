export const formatOrderDate = (dateStr) => {
    if(!dateStr) return;
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
};