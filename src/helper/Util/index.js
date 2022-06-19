const ArrayCut = (array, maxItems) => {
    const Count = array.length;
    const start = (Count - maxItems) > 0 ? (Count - maxItems) : 0;
    return array.slice(start, Count);
}

module.exports = {
    ArrayCut
};//end module.exports