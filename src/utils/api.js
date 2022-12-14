const onResponce = (res) => {
	return res.ok ? res.json() : res.json().then(err=>Promise.reject(err));
}
class Api {
	constructor({ baseUrl, headers }) {
		this._headers = headers;
		this._baseUrl = baseUrl;
	}

	getProductList() {
		return fetch(`${this._baseUrl}/products`, {
			headers: this._headers
		}).then(onResponce)
	}
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		}).then(onResponce)
	}
	getProductById(idProduct) {
		return fetch(`${this._baseUrl}/products/${idProduct}`, {
			headers: this._headers
		}).then(onResponce)
	}
	setUserInfo(dataUser) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify(dataUser)
		}).then(onResponce)
	}
	createReviewProduct(productId, reviewData) {
		return fetch(`${this._baseUrl}/products/review/${productId}`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(reviewData)
		}).then(onResponce)
	}
	search(searchQuery) {
		return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
			headers: this._headers
		}).then(onResponce)
	}

	changeLikeProduct(productId, isLike) {
		return fetch(`${this._baseUrl}/products/likes/${productId}`, {
			method: isLike ? "DELETE" : "PUT",
			headers: this._headers
		}).then(onResponce)
	}
}

const config = {
	baseUrl: 'https://api.react-learning.ru',
	headers: {
		'content-type': 'application/json',
		authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNzU5Yjk4YjAzOGY3NzlkMWUiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NTAsImV4cCI6MTY5OTQ0Nzk1MH0.r8ryBOBE447keN9YO87stltsLf1vBF_ATp9X0v5sHpw'
	}
}
const api = new Api(config);

export default api;
