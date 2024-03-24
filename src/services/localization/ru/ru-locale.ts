import {
	texts_a,
	texts_b,
	texts_c,
	texts_d,
	texts_e,
	texts_f,
	texts_g,
	texts_h,
	texts_i,
	texts_j,
	texts_l,
	texts_m,
	texts_n,
	texts_p,
	texts_r,
	texts_s,
	texts_t,
	texts_u,
} from "services/localization/texts";
import { timezonesRu } from "services/localization/ru/timezones-ru";
import { weekdaysRu } from "services/localization/ru/weekdays-ru";
import { reportsRu } from "@/features/reports/localization/reports-ru";

export const ruLocale = {
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
		[texts_a.author]: "автор",
		[texts_a.accept]: "принять",
		[texts_a.add_new_scheduler]: "добавить новый планировщик",
		[texts_a.add_comment]: "добавьте комментарий",
		Activate: "Активировать",
		[texts_a.active_request]: "Активные запросы",
		[texts_a.approximate_action_time]: "приблизительное время начала действия",
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
		"birthday donuts": "пончики на день рождения",
		[texts_b.birthday_points]: "монеты на день рождения",
		[texts_b.birthday_message]: "сообщение на день рождения",
		[texts_b.blocked]: "заблокировано",
		back: "назад",
		Buy: "Купить",
		"Burn old points": "Списывать неиспользованные монеты",
		"Burn old donuts": "Списывать неиспользованные пончики",
		[texts_b.burn_unused_donuts]: "списывать неиспользованные пончики",

		// C
		Cancel: "Отмена",
		cancel: "отмена",
		Caption: "Название",
		caption: "название",
		Change: "Изменить",
		"Can not be empty": "Не может быть пустым",
		"Change password": "Сменить пароль",
		Confirm: "Подтвердить почтовый адрес",
		"Confirmation dialog": "Подтверждение",
		confirmation: "подтверждение",
		[texts_c.coins]: "монеты",
		[texts_c.comment]: "комментарий",
		[texts_c.confirmation_email_was_sent_to]:
			"Письмо для подтверждения было отправлено на ваш электронный адрес",
		"Confirmation email was sent to": "Подтвердите адрес электронной почты ",
		"Confirm your email first": "Для продолжения подтвердите адрес электронной почты ",
		"Connect to space": "Присоединиться к пространству",
		[texts_c.confirm]: "подтвердить",
		[texts_c.comment_is_required]: "введите комментарий",
		[texts_c.confirmed]: "подтверждено",
		[texts_c.choose_type]: "выберите тип",
		[texts_c.choose_day]: "выберите день",
		[texts_c.choose_time]: "выберите время",
		[texts_c.choose_timezone]: "выберите часовой пояс",
		code: "код",
		Comment: "Комментарий",
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
		[texts_d.demo]: "демо",
		[texts_d.day]: "день",
		DEMO: "Демо",
		Dashboard: "Лента",
		Delete: "Удалить",
		[texts_d.donuts]: "пончики",
		[texts_d.decline]: "отклонить",
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
		donut_zero: "пончиков",
		donut_one: "пончик",
		donut_few: "пончика",
		donut_many: "пончиков",
		donut_other: "пончиков",
		"Domain not found": "Не найден почтовый домен",
		Domain: "Домен",
		domain: "домен",
		"Drag and drop an image here or click to select a file Drag and drop an image here or click to select a file":
			"Перетащите сюда файл или кликните, для выбора",
		"Drag and drop an image here or click to select a file":
			"Перетащите сюда файл или кликните, для выбора",

		// E
		Edit: "Редактировать",
		"Employment date": "Дата приема",
		"Edit donut": "Редактировать пончик",
		"Error while updating": "Ошибка во время обновления",
		[texts_e.email_address_must_be_valid]: "Почтовый адрес должен быть в верном формате",
		Employees: "Сотрудники",
		employees: "сотрудники",
		[texts_e.email_notification]: "оповещения по почте",
		[texts_e.email_confirmation]: "подтверждение почты",
		[texts_e.empty_events_placeholder]: "здесь будут отображаться все события",
		[texts_e.edit]: "редактировать",
		[texts_e.every_week]: "каждую неделю",
		[texts_e.every_month]: "каждый месяц",
		Email: "Email",
		[texts_e.email_address]: "почтовый адрес",
		error: "ошибка",
		Events: "События",
		"Expiration date": "Дата окончания",
		Exit: "Выход",
		"expiration date": "срок действия",

		// F
		[texts_f.first_name]: "имя",
		forbidden: "запрещено",
		for: "для",
		from: "от",

		// G
		"Go to shop": "В магазин",
		"Go to": "Перейти",
		[texts_g.go_to]: "перейти",
		Goods: "Товары",

		// H
		History: "История",
		[texts_h.history]: "история",
		Home: "Главная",
		"How many points do you want to send": "Сколько монет вы хотите отправить",
		"How many donuts do you want to send": "Сколько пончиков вы хотите отправить",
		"Hide snow": "Убрать снег",

		// I
		Invitations: "Приглашения",
		"Incoming requests": "Входящие запросы",
		incoming: "входящие",
		"in date": "дата приема",
		[texts_i.invitations]: "приглашения",
		[texts_i.i_can_share]: "я могу поделиться",
		[texts_i.i_can_spend]: "я могу потратить",
		"invitation added": "Приглашение отправлено",
		// J
		Join: "Присоединиться",
		[texts_j.join]: "присоединиться",

		// K

		// L
		[texts_l.last_name]: "фамилия",
		"Log in": "Войти",
		"Log Out": "Выйти",

		// M
		Max: "Макс",
		Min: "Мин",
		[texts_m.max_amount_is]: "максимальное значение - ",
		[texts_m.min_amount_is]: "минимальное значение - ",
		"Max donuts": "Макисмальное количество пончиков",
		message: "сообщение",
		"My Requests": "Мои запросы",
		"My requests": "Мои запросы",
		"My spaces": "Мои команды",
		"My teams": "Мои команды",
		"My tenants": "Мои команды",
		[texts_m.my_teams]: "мои команды",
		More: "Ещё",
		more: "ещё",
		// N
		[texts_n.name_is_required]: "необходимо задать имя",
		"new password": "новый пароль",
		"New points for all users": "Новые монеты для всех пользователей",
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
		[texts_n.no_name]: "без имени",
		[texts_n.not_found]: "не найдено",
		[texts_n.new_invitation]: "новое приглашение",
		[texts_n.new_scheduler]: "новый планировщик",
		[texts_n.new_invitation_was_created]: "Новое приглашение было создано",
		[texts_n.new_invitation_email_was_sent]: "Письмо с приглашением было отправлено",
		// O
		"on stock": "в наличии",
		"Only you can see it": "Только вы это видите",
		// P
		[texts_p.password]: "пароль",
		[texts_p.password_changed]: "пароль изменен",
		[texts_p.password_repeat]: "пароль еще раз",
		[texts_p.password_is_required]: "пароль необходим",
		[texts_p.passwords_do_not_math]: "пароль не совпадает",
		[texts_p.password_confirm_is_required]: "подтверждение пароля необходимо",
		[texts_p.period_start]: "начало периода",
		[texts_p.period_end]: "конец периода",
		Page: "Страница",
		People: "Сотрудники",
		"Please confirm your email": "Пожалуйста, подтвердите почтовый адрес",
		points: "монеты",
		point_zero: "монет",
		point_one: "монета",
		point_few: "монет",
		point_many: "монет",
		point_other: "монет",
		position: "должность",
		Position: "Должность",
		Plugins: "Плагины",
		preview: "просмотр",
		Price: "Цена",
		price: "цена",
		[texts_p.purchase]: "покупка",
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
		[texts_r.refund]: "возврат",
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
		[texts_r.restore_password]: "восстановить пароль",
		[texts_r.recover_email_has_been_sent]: "письмо для восставновления пароля было отправлено",
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
		[texts_s.settings_updated]: "настройки обновлены",
		[texts_s.scheduler_created]: "планировщик создан",
		[texts_s.scheduler_updated]: "планировщик обновлен",
		[texts_s.scheduler_deleted]: "планировщик удален",
		[texts_s.scheduler_delete]: "удаление планировщика",
		save: "сохранить",
		saved: "сохранено",
		"Save changes": "Сохранить изменения",
		"Self account": "Могу потратить",
		Search: "Поиск",
		"Search string": "Строка поиска",
		search: "поиск",
		[texts_s.set_password]: "установить пароль",
		Share: "Поделиться",
		share: "поделиться",
		"Share dialog": "Окно подарков",
		"Show only mine": "Показывать только мои",
		"Show snow": "Включить снег",
		"sort by alphabet": "сортировать по алфавиту",
		"Store item": "Элемент магазина",
		Send: "Отправить",
		"Send to all": "Отправить всем",
		"Send again": "Отправить еще раз",
		[texts_s.send_confirmation_email]: "Отправить письмо подтверждения",
		"Select image": "Выбрать картинку",
		"select all": "выбрать всех",
		"selected employees": "выбранные сотрудники",
		Settings: "Настройки",
		Schedule: "Расписание",
		Schedulers: "Расписания",
		Sign_Out: "Выход",
		Sign_In: "Войти",
		[texts_s.send]: "Отправить",
		[texts_s.sign_in]: "войти",
		[texts_s.sign_up]: "регистрация",
		[texts_s.soon_will_be_back]: "Он улетел, но обещал вернуться",
		[texts_s.show_only_mine]: "только мои",
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
		"Team settings": "Настройки команды",
		transferred: "перведено",
		"transfer points": "перевести монеты",
		"transfer donuts": "перевести пончики",
		to: "для",
		[texts_t.transfer]: "перевести",
		[texts_t.transfer_type]: "тип перевода",
		[texts_t.to_store]: "в магазин",
		"Transfer donuts or coins": "Перевести пончики или монеты", // route name!
		[texts_t.time_is_required]: "необходимо указать время",
		"to can transfer to others": "можно дарить коллегам",
		"This field is required": "Это поле является обязательным",
		[texts_t.teams_you_can_join]: "команды, к которым можно присоединиться",
		[texts_t.tooltip_scheduler_time]:
			"фактическое действие будет запущено в течении 1 часа после указанного времени.",
		"Teams I can join": "Команды, к которым могу присоединиться",
		// U
		"Update donut": "Обновить пончик",
		Update: "Обновить",
		[texts_u.under_construct]: "В разработке",
		[texts_u.updated]: "обновлено",
		"Update is available": "Обновление доступно",
		"user can spend in store": "можно тратить в магазине",
		// V

		// W
		"welcome points": "приветственные монеты",
		"welcome donuts": "приветственные пончики",
		"Without department": "Без подразделения",
		"Wrong credentials": "Не удалось войти с этим именем и паролем",
		"Withdrawal error. Not enough points": "Ошибка. Недостаточно монет",
		// X

		// Y
		"you have to be admin": "Вы должны иметь полномочия администратора",
		"You have successfully bought a new donut": "Вы успешно купили плюшку",
		"your comment": "ваш комментарий",
		yes: "да",
		// Z
		...timezonesRu,
		...weekdaysRu,
		...reportsRu.translations,
	},
};
