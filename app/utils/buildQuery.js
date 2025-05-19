export const buildQuery = ({name, tags, price}) => {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (tags.length > 0) params.append("tags", tags);
    if (price) params.append("price", price)
    return params.toString()
}