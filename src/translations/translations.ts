export const translations = {
  navbar: {
    EN: {
      home: "Home",
      events: "Events",
      people: "People",
      publications: "Publications",
      contact: "Contact",
      projects: "Projects",
    },
    RU: {
      home: "Главная",
      events: "События",
      people: "Люди",
      publications: "Публикации",
      contact: "Контакты",
      projects: "Проекты",
    },
  },
  projectSubItems: {
    EN: {
      quail: "QuAIL",
      rusentiment: "RuSentiment",
      conceptnorm: "Medical Concept Normalization",
      twitterhawk: "TwitterHawk",
      externalPages: "External Pages",
    },
    RU: {
      quail: "QuAIL",
      rusentiment: "RuSentiment",
      conceptnorm: "Нормализация медицинских концепций",
      twitterhawk: "TwitterHawk",
      externalPages: "Внешние страницы",
    },
  },
  card: {
    EN: {
      skills: "Skills",
      projects: "Projects",
      publications: "Publications",
    },
    RU: {
      skills: "Навыки",
      projects: "Проекты",
      publications: "Публикации",
    }
  },
  footer: {
    EN: {
      copyright: "© Text Machine Lab.",
    },
    RU: {
      copyright: "© Лаборатория Text Machine.",
    },
  },
  home: {
    EN: {
      title: "Text Machine Lab",
      intro: "The Text Machine Lab at UMass Lowell conducts research in deep learning for for natural language processing, with a focus on representation learning and model interpretability. Our current and past projects span the following research areas:",
      areas: [
        "Model interpretability and representation learning.",
        "Efficient large model training.",
        "Text-based temporal reasoning, conversational agents, argument mining.",
        "Clinical natural language processing, including information extraction, and predictive modeling using clinical patient records.",
        "NLP for educational applications, digital knowledge and sentiment tracking for digital humanities and social science.",
      ],
      news: "News",
      newsItems: [
        "The second New England NLP Meetup NENLP Meetup was held in April 2023 at UMass Lowell.",
        "The first New England NLP Meetup NENLP Meetup was held in April 2022 at MIT.",
        "We orgnized the Clinial NLP Workshop at NAACL 2022 Clinial NLP Workshop 2022.",
        "We conducted the Insights from Negative results from NLP workshop 2022 Insights from Negative results from NLP workshop at ACL 2022.",
        "Anna Rumshisky served as Program Chair for NAACL 2021.",
        "All news prior to 2019 can be found in our Archived News page.",
      ],
    },
    RU: {
      title: "Лаборатория Text Machine",
      intro: "Лаборатория Text Machine в Университете Массачусетса Лоуэлл проводит исследования в области глубокого обучения для обработки естественного языка с акцентом на репрезентативное обучение и интерпретируемость моделей. Наши текущие и прошлые проекты охватывают следующие области исследований:",
      areas: [
        "Интерпретируемость моделей и представленное обучение.",
        "Эффективное обучение больших моделей.",
        "Временные рассуждения на основе текста, диалоговые агенты, анализ аргументов.",
        "Клиническая обработка естественного языка, включая извлечение информации и прогностическое моделирование с использованием клинических записей пациентов.",
        "NLP для образовательных приложений, отслеживание цифровых знаний и настроений для цифровых гуманитарных наук и социальных наук.",
      ],
      news: "Новости",
      newsItems: [
        "Вторая встреча New England NLP Meetup NENLP Meetup состоялась в апреле 2023 года в UMass Lowell.",
        "Первая встреча New England NLP Meetup NENLP Meetup состоялась в апреле 2022 года в MIT.",
        "Мы организовали семинар по клиническому NLP на NAACL 2022 Clinial NLP Workshop 2022.",
        "Мы провели семинар Insights from Negative results from NLP workshop 2022 Insights from Negative results from NLP workshop на ACL 2022.",
        "Анна Румшицкий была председателем программы NAACL 2021.",
        "Все новости до 2019 года можно найти на нашей странице архивированных новостей.",
      ]
    },
  },
  projects: {
    EN: {
      title: "Projects",
      quail: "QuAIL",
      quailAlt: "Image of a cartoon quail made of simple shapes sitting on a twig.",
      quailDesc: "A new kind of question-answering dataset that combines commonsense, text-based, and unanswerable questions, balanced for different genres and reasoning types. Reasoning type annotation for 9 types of reasoning: temporal, causality, factoid, coreference, character properties, their belief states, subsequent entity states, event durations, and unanswerable. Genres: CC license fiction, Voice of America news, blogs, user stories from Quora 800 texts, 18 questions for each (~14K questions).",
      rusentiment: "RuSentiment",
      rusentimentAlt: "A simplistic cartoon blue matroshka doll with the word 'RuSentiment' next to it and a yellow speech bubble saying '~31k annotated Russian posts!' underneath.",
      rusentimentDesc: "RuSentiment is a new high-quality dataset for sentiment analysis in Russian, enriched with active learning. We also present a lightweight annotation scheme for social media that ensures high speed and consistency, and can be applied to other languages (Russian and English versions released).",
      rusentimentTags: ["Sentiment", "Social Media"],
      conceptnorm: "Medical Concept Normalization",
      conceptnormAlt: "'Cardiac infarction', 'MI', and 'Heart Attack' in a circle with gray arrows pointing between each other.'",
      conceptnormDesc: "This project addresses the problem of normalization of medical records, i.e. mapping of clinical terms in medical notes to standardized medical vocabularies.",
      conceptnormTags: ["Biomedical"],
      twitterhawk: "TwitterHawk",
      externalPages: "External Pages",
    },
    RU: {
      title: "Проекты",
      quail: "QuAIL",
      quailAlt: "Изображение мультяшного перепела, состоящего из простых форм, сидящего на ветке.",
      quailDesc: "Новый тип набора данных для вопросов и ответов, который сочетает в себе вопросы здравого смысла, основанные на тексте, и неотвечаемые вопросы, сбалансированные для разных жанров и типов рассуждений. Аннотация типа рассуждений для 9 типов рассуждений: временные, причинные, фактоидные, кореференциальные, свойства персонажей, их состояния веры, последующие состояния сущностей, продолжительность событий и неотвечаемые. Жанры: лицензия CC fiction, новости Voice of America, блоги, пользовательские истории из Quora 800 текстов, 18 вопросов для каждого (~14K вопросов).",
      rusentiment: "RuSentiment",
      rusentimentAlt: "Простая мультяшная синяя матрешка с надписью 'RuSentiment' рядом и желтым речевым пузырем с надписью '~31k аннотированных русских постов!' внизу.",
      rusentimentDesc: "RuSentiment - это новый высококачественный набор данных для анализа настроений на русском языке, обогащенный активным обучением. Мы также представляем легкую схему аннотации для социальных сетей, которая обеспечивает высокую скорость и согласованность и может быть применена к другим языкам (выпущены русская и английская версии).",
      rusentimentTags: ["Настроение", "Социальные сети"],
      conceptnorm: "Нормализация медицинских концепций",
      conceptnormAlt: "'Кардиальный инфаркт', 'МИ' и 'Сердечный приступ' в круге с серыми стрелками, указывающими друг на друга.'",
      conceptnormDesc: "Этот проект решает проблему нормализации медицинских записей, т.е. сопоставление клинических терминов в медицинских заметках со стандартизированными медицинскими словарями.",
      conceptnormTags: ["Биомедицина"],
      twitterhawk: "TwitterHawk",
      externalPages: "Внешние страницы",
    },
  },
  events: {
    EN: {
      title: "Events",
      nenlp: "Workshop on Insights from Negative Results in NLP",
      nenlpAlt: "A picture of a cartoon lemon with a squiggly arrow pointing to a glass of lemonade.",
      nenlpDesc: "This workshop invites both practical and theoretical unexpected or negative results that have important implications for future research, highlight methodological issues with existing approaches, and/or point out pervasive misunderstandings or bad practices. In particular, the most successful NLP models currently rely on different kinds of pretrained meaning representations (from word embeddings to Transformer-based models like BERT). To complement all the success stories, it would be insightful to see where and possibly why they fail. Any NLP tasks are welcome: sequence labeling, question answering, inference, dialogue, machine translation - you name it.",
    },
    RU: {
      title: "События",
      nenlp: "Мастерская по получению информации из отрицательных результатов в NLP",
      nenlpAlt: "Изображение мультяшного лимона с извилистой стрелкой, указывающей на стакан лимонада.",
      nenlpDesc: "Эта мастерская приглашает как практические, так и теоретические неожиданные или отрицательные результаты, которые имеют важные последствия для будущих исследований, подчеркивают методологические проблемы с существующими подходами и/или указывают на распространенные недоразумения или плохие практики. В частности, наиболее успешные модели NLP в настоящее время полагаются на различные виды предварительно обученных представлений значений (от встраивания слов до моделей на основе трансформаторов, таких как BERT). Чтобы дополнить все истории успеха, было бы полезно увидеть, где и, возможно, почему они терпят неудачу. Добро пожаловать любые задачи NLP: маркировка последовательностей, вопросы и ответы, выводы, диалог, машинный перевод - вы называете это.",
    },
  },
  people: {
    EN: {
      title1: "Current Members",
      subtitle1: "Graduate Students",
      subtitle2: "Interns",
      title2: "Alumni",
      anna: {
        title: "Anna Rumshisky",
        alt: "Photo of Anna Rumshisky",
        label: "Website",
      },
      vijeta: {
        title: "Vijeta Deshpande",
        alt: "Photo of Vijeta Deshpande",
        content: "Hi folks, I’m Vijeta, a Research Assistant in the Text Machine Lab. My research explores how vocabulary shapes the language understanding and generation capabilities of large (and small) language models. I have a strong passion for working on sequential data and decision problems. Before starting my Ph.D., I earned an M.S. in Operations Research from UMass Amherst in 2019, where I focused on designing and evaluating health intervention policies.",
        label1: "Email",
        label2: "GitHub",
        label3: "LinkedIn",
        label4: "Google Scholar",
      }
    },
    RU: {
      title1: "Текущие участники",
      subtitle1: "Аспиранты",
      subtitle2: "Стажеры",
      title2: "Выпускники",
      anna: {
        title: "Анна Румшицкий",
        alt: "Фото Анны Румшицкий",
        label: "Сайт",
      },
      vijeta: {
        title: "Виджета Дешпандэ",
        alt: "Фото Виджеты Дешпандэ",
        content: "Привет всем, я Виджета, научный сотрудник в лаборатории Text Machine Lab. Мои исследования изучают, как словарный запас формирует возможности понимания и генерации языка больших (и малых) языковых моделей. У меня есть сильная страсть к работе с последовательными данными и задачами принятия решений. Перед началом моей докторской степени я получил степень магистра в области исследований операций в UMass Amherst в 2019 году, где я сосредоточился на разработке и оценке политик вмешательства в области здравоохранения.",
        label1: "Электронная почта",
        label2: "GitHub",
        label3: "LinkedIn",
        label4: "Google Scholar",
      }
    },
  },
  publications: {
    EN: {
      title: "Publications",
      pub1_25: "H. Auby, N. Shivagunde, A. Rumshisky, M. Koretsky. Using Machine Learning to Analyze Short-Answer Responses to Conceptually Challenging Chemical Engineering Thermodynamics Questions. 2024 ASEE Annual Conference & Exposition, Portland, Oregon.",
      pub2_25: "V. Lialin, S. Muckatira, N. Shivagunde, A. Rumshisky. Relora: High-rank training through low-rank updates. The Twelfth International Conference on Learning Representations, 2023.",
      pub3_25: "N. Shivagunde, V. Lialin, S. Muckatira, A. Rumshisky. Deconstructing In-Context Learning: Understanding Prompts via Corruption. LREC-COLING 2024.",
      pub4_25: "S. Muckatira, V. Deshpande, V. Lialin, A. Rumshisky. Emergent Abilities in Reduced-Scale Generative Language Models. NAACL Findings 2024.",
      pub5_25: "N. Shivagunde, M. Kulkarni, G. Karamanolakis, J. G. M. FitzGerald, Y. Versley, S. Soltan, V. Cevher, J. Lu, A. Rumshisky. Approximations may be all you need: Towards pre-training LLMs with low-rank decomposition and optimizers. NeurIPS 2024 Workshop on Efficient Natural Language and Speech Processing (ENLSP-IV) 2024.",
    },
    RU: {
      title: "Публикации",
      pub1_25: "H. Auby, N. Shivagunde, A. Rumshisky, M. Koretsky. Использование машинного обучения для анализа кратких ответов на концептуально сложные вопросы по термодинамике химической инженерии. Ежегодная конференция и выставка ASEE 2024, Портленд, Орегон.",
      pub2_25: "V. Lialin, S. Muckatira, N. Shivagunde, A. Rumshisky. Relora: обучение высокого ранга через обновления низкого ранга. Двенадцатая международная конференция по обучению представлениям, 2023.",
      pub3_25: "N. Shivagunde, V. Lialin, S. Muckatira, A. Rumshisky. Деконструкция обучения в контексте: понимание подсказок через коррупцию. LREC-COLING 2024.",
      pub4_25: "S. Muckatira, V. Deshpande, V. Lialin, A. Rumshisky. Возникающие способности в генеративных языковых моделях уменьшенного масштаба. NAACL Findings 2024.",
      pub5_25: "N. Shivagunde, M. Kulkarni, G. Karamanolakis, J. G. M. FitzGerald, Y. Versley, S. Soltan, V. Cevher, J. Lu, A. Rumshisky. Приближения могут быть всем, что вам нужно: к предварительному обучению LLM с низкоранговым разложением и оптимизаторами. NeurIPS 2024 Workshop по эффективной обработке естественного языка и речи (ENLSP-IV) 2024.",
    },
  },
  contact: {
    EN: {
      title: "Contact",
      learnmore: "For general information about UMass Lowell, visit"
    },
    RU: {
      title: "Контакты",
      learnmore: "Для получения общей информации об UMass Lowell посетите"
    },
  },
  quail: {
    EN: {
      title: "QuAIL",
    },
    RU: {
      title: "QuAIL",
    },
  },
  rusentiment: {
    EN: {
      title: "RuSentiment",
    },
    RU: {
      title: "RuSentiment",
    },
  },
  conceptnorm: {
    EN: {
      title: "Medical Concept Normalization",
    },
    RU: {
      title: "Нормализация медицинских концепций",
    },
  },
  twitterhawk: {
    EN: {
      title: "TwitterHawk",
    },
    RU: {
      title: "TwitterHawk",
    },
  },
};
