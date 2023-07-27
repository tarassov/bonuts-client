import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { texts_u } from "services/localization/texts/texts_u";
import { texts_r } from "services/localization/texts/texts_r";
import { texts_c } from "services/localization/texts";

i18n.use(LanguageDetector).init({
	// we init with resources
	resources: {
		en: {
			translations: {
				Events: "Events",

				Balance: "Balance",

				"Confirmation email was sent to": "Confirmation email was sent to",
				Confirm: "Confirm email",

				Dashboard: "Dashboard",

				"invitation added": "Invitation added",
				"Registration Confirmation": "Registration Confirmation",
				"regard added": "New donuts has been bought",
				"name has been taken": "NAME HAS BEEN TAKEN",
				"Log in": "Log in",
				Sign_In: "Sign In",
				Sign_Out: "Sign Out",
				Sign_Up: "Sign Up",
				"Recover password": "Recover password",

				// CONSTS
				CONST_GREETINGS:
					"Fast and simple way to   encourage your colleagues and thank them for their patience and help.",
			},
		},
		ru: {
			translations: {
				// CONSTS
				CONST_GREETINGS: "Простой и быстрый способ поблагодарить ваших коллег за отличную работу.",
				// A
				Account: "Аккаунт",
				"About myself": "Обо мне",
				Amount: "Количество",
				amount: "количество",
				Add: "Добавить",
				admin: "админ",
				"admin deposit": "Депозит (админ)",
				Activate: "Активировать",
				Active: "Активен",
				active: "активен",
				activated: "в работе",
				"access denied": "доступ закрыт",
				"Active requests": "Запросы в работе",
				"Active donuts": "Активные пончики",
				"Already used regards": "Уже использованные награды",
				"Activate regard code": "Активация кода награды",
				"Already activated": "Уже активировано",
				"Accepted requests": "Активированные запросы",
				"All users": "Все пользователи",
				"are you sure to delete?": "вы точно хотите удалить?",
				"are you sure?": "вы уверены?",
				"available employees": "доступные сотрудники",
				// B
				"Back to store": "Назад в магазин",
				Balance: "Баланс",
				Buy: "Купить",
				"Burn old points": "Списывать неиспользованные баллы",
				"Burn old donuts": "Списывать неиспользованные пончики",

				// C
				Cancel: "Отмена",
				cancel: "отмена",
				Caption: "Название",
				Change: "Изменить",
				"Can not be empty": "Не может быть пустым",
				"Change password": "Сменить пароль",
				Confirm: "Подтвердить почтовый адрес",
				"Confirmation dialog": "Подтверждение",
				confirmation: "подтверждение",
				"Confirmation email was sent to": "Подтвердите адрес электронной почты ",
				"Confirm your email first": "Для продолжнеия подтвердите адрес электронной почты ",
				"Connect to space": "Присоединиться к пространству",
				code: "код",
				Comment: "Комментарий",
				comment: "комментарий",
				Contact: "Контакт",
				"Comment saved": "Комментарий сохранен",
				"Click to select files": "Нажмите, чтобы выбрать фото",
				"Closed requests": "Завершенные запросы",
				Close: "Закрыть",
				close: "закрыть",
				closed: "закрытые",
				"closed requests": "закрытые запросы",
				Circles: "Круги",
				created: "создан(а)",
				create: "создать",
				[texts_c.choose_employees]: "выберите сотрудников",

				// D
				"Date of birth": "Дата рождения",
				department: "подразделение",
				"Day of month": "День месяца",
				DEMO: "Демо",
				Dashboard: "Лента",
				Delete: "Удалить",
				"delivery days": "через сколько дней будет",
				Departments: "Отделы",
				Department: "Отдел",
				Description: "Описание",
				description: "описание",
				Details: "Подробнее",
				"department chief": "руководитель подразделения",
				"Distrib account": "Могу отдать",
				"disable account": "отключить аккаунт",
				"Donut name": "Название плюшки",
				"Donut added": "Пончик добавлен",
				"Share donuts": "Перевести пончики",
				Discard: "Отменить изменения",
				Donut: "Пончик",
				Donuts: "Пончики",
				"Donut description": "Описание пончика",
				donuts: "пончики",
				donut_zero: "пончиков",
				donut_one: "пончик",
				donut_few: "пончика",
				donut_many: "пончиков",
				donut_other: "пончиков",
				"Domain not found": "Не найден почтовый домен",
				Domain: "Домен",
				"Drag and drop an image here or click to select a file Drag and drop an image here or click to select a file":
					"Перетащите сюда файл или кликните, для выбора",
				"Drag and drop an image here or click to select a file":
					"Перетащите сюда файл или кликните, для выбора",

				// E
				Edit: "Редактировать",
				"Employment date": "Дата приема",
				"Edit donut": "Редактировать пончик",
				"Error while updating": "Ошибка во время обновления",
				Employees: "Сотрудники",
				employees: "сотрудники",
				Email: "Email",
				error: "ошибка",
				Events: "События",
				"Expiration date": "Дата окончания",
				Exit: "Выход",
				"expiration date": "срок действия",

				// F
				forbidden: "запрещено",
				for: "для",
				from: "от",
				// G
				"Go to shop": "В магазин",
				"Go to": "Перейти",
				Goods: "Товары",

				// H
				History: "История",
				Home: "Главная",
				"How many points do you want to send": "Сколько баллов вы хотите отправить",
				"How many donuts do you want to send": "Сколько пончиков вы хотите отправить",
				"Hide snow": "Убрать снег",

				// I
				"Incoming requests": "Входящие запросы",
				incoming: "входящие",
				"in date": "дата приема",
				"invitation added": "Приглашение отправлено",
				// J
				Join: "Присоединиться",

				// K

				// L
				"Log in": "Войти",
				"Log Out": "Выйти",

				// M
				Max: "Макс",
				Min: "Мин",
				"Max donuts": "Макисмальное количество пончиков",
				message: "сообщение",
				"My Requests": "Мои запросы",
				"My requests": "Мои запросы",
				"My spaces": "Мои команды",
				"My teams": "Мои команды",
				"My tenants": "Мои команды",
				More: "Ещё",
				more: "ещё",
				// N
				"new password": "новый пароль",
				"New points for all users": "Новые баллы для всех пользователей",
				Name: "Имя",
				"name has been taken": "Имя уже занято",
				name: "название",
				"New item": "Новый элемент",
				"new donut": "Новый пончик",
				"new circle": "новый круг",
				newest: "самые новые",
				Next: "Вперед",
				next: "далее",
				"Not active donuts": "Неактивные пончики",
				"No options": "Нет вариантов",
				"not active": "не активен",

				// O
				"on stock": "в наличии",
				"Only you can see it": "Только вы это видите",
				// P
				Page: "Страница",
				People: "Сотрудники",
				"Please confirm your email": "Пожалуйста, подтвердите почтовый адрес",
				points: "баллы",
				point_zero: "баллов",
				point_one: "балл",
				point_few: "балла",
				point_many: "баллов",
				point_other: "баллов",
				position: "должность",
				Position: "Должность",
				Plugins: "Плагины",
				preview: "просмотр",
				Price: "Цена",
				price: "цена",
				"price asc": "сначала самые дешевые",
				"price desc": "сначала самые дорогие",
				Profile: "Профиль",
				profile: "профиль",
				profiles: "профили",
				pts: "бон.",
				PTS: "БОН.",
				place: "место",
				Previous: "Назад",
				previous: "назад",
				Purchase: "Покупка",
				// Q

				// R
				"regard added": "Покупка успешно совершена",
				"request added": "Запрос создан",
				"Registration Confirmation": "Подтверждение регистрации",
				"Recover password": "Восстановить пароль",
				"Requests in progress": "Запросы в работе",
				Refund: "Возврат",
				[texts_r.remove_all]: "удалить всех",
				Required: "Обязательное поле",
				requests: "запросы",
				Requests: "Запросы",
				Register: "Зарегистрировать",
				Remove: "Удалить",
				records: "записей",
				records_zero: "записей",
				records_one: "запись",
				records_few: "записи",
				records_many: "записей",
				records_other: "записей",
				"request has been refunded": "запрос отменен",
				"request has been set as incoming": "запрос переведен во входящие",
				"request has been set as close": "запрос переведен во закрытые",
				"request has been set as active": "запрос переведен в работе",
				"Refresh or activate": "Обновить или активировать",
				Rollback: "Вернуть",
				Roles: "Роли",
				rows: "строк",
				"rows per page": "строк на стр.",

				// S
				save: "сохранить",
				saved: "сохранено",
				"Save changes": "Сохранить изменения",
				"Self account": "Могу потратить",
				Search: "Поиск",
				"Search string": "Строка поиска",
				search: "поиск",
				Share: "Поделиться",
				"Share dialog": "Окно подарков",
				"Show only mine": "Показывать только мои",
				"Show snow": "Включить снег",
				"sort by alphabet": "сортировать по алфавиту",
				"Store item": "Элемент магазина",
				Send: "Отправить",
				"Send to all": "Отправить всем",
				"Send again": "Отправить еще раз",
				"Select image": "Выбрать картинку",
				"select all": "выбрать всех",
				"selected employees": "выбранные сотрудники",
				Settings: "Настройки",
				Schedule: "Расписание",
				Schedulers: "Расписания",
				Sign_Out: "Выход",
				Sign_In: "Войти",
				Sign_Up: "Регистрация",
				Statistic: "Статистика",
				"start typing": "начните ввод",
				Store: "Магазин",
				"Store admin": "Администратор магазина",
				"store admin": "управляющий",
				"Something went wrong.": "Что-то пошло не так.",
				Surname: "Фамилия",
				"Submit values": "Отправить",
				Submit: "Подтвердить",

				// T
				Tenant: "Команда",
				transferred: "перведено",
				"transfer points": "перевести баллы",
				"transfer donuts": "перевести пончики",
				to: "для",
				"to can transfer to others": "можно дарить коллегам",
				"This field is required": "Это поле является обязательным",
				"Team settings": "Настройки команды",
				"Teams I can join": "Команды, к которым могу присоединиться",
				// U
				"Update donut": "Обновить пончик",
				Update: "Обновить",
				[texts_u.under_construct]: "В разработке",
				"Update is available": "Обновление доступно",
				"user can spend in store": "можно тратить в магазине",
				// V

				// W
				"Welcome points": "Приветственные баллы",
				"Welcome donuts": "Приветственные пончики",
				"Without department": "Без подразделения",
				"Wrong credentials": "Не удалось войти с этим именем и паролем",
				"Withdrawal error. Not enough points": "Ошибка. Недостаточно баллов",
				// X

				// Y
				"you have to be admin": "Вы должны иметь полномочия администратора",
				"You have successfully bought a new donut": "Вы успешно купили плюшку",
				"your comment": "ваш комментарий",
				yes: "да",
				// Z
			},
		},
	},
	fallbackLng: "en",
	debug: true,

	// have a common namespace used around the full app
	ns: ["translations"],
	defaultNS: "translations",

	keySeparator: false, // we use content as keys

	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ",",
	},
});

export default i18n;
