import { ICONS } from 'assets/images/icons';
import ROUTE_NAMES from 'routes/RouteNames';
import { Icons } from 'shared/components/AnyIcon';

export const SECRET_STRING = '\u274B\u274B\u274B\u274B';

export const CoinData = [
  {
    id: '1',
    icon: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg',
    name: 'Bitcoin',
    amount: '$2,566.7',
    ticker: 'BTC',
    balance: '0,0000335',
    usdBalance: '335',

    gain: '+3.50%',
  },
  {
    id: '2',
    icon: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
    name: 'Ethereum',
    amount: '$1,466.7',
    ticker: 'ETH',
    balance: '0,0000335',
    usdBalance: '335',
    gain: '+2.00%',
  },
];
export const txButtons = [
  //  { iconName: "arrow-down-right", title: "2FA", routeName: ROUTE_NAMES.OPT_SWITCHER },
  {
    iconName: 'arrow-down',
    title: 'Deposit',
    routeName: ROUTE_NAMES.CHOOSE_CURRENCY,
  },
  {
    iconName: 'arrow-up',
    title: 'Send',
    routeName: ROUTE_NAMES.SEND_ASSETS,
  },
  {
    iconName: 'swap',
    title: 'swapping',
    routeName: ROUTE_NAMES.EXCHANGE_CURRENCY,
  },
  {
    iconName: 'credit-card-refund-outline',
    title: 'Withdraw',
    routeName: ROUTE_NAMES.WITHDRAW_ASSETS,
  },
];
export const kycStatus = {
  nonVerified: 'Not Verified',
  verified: 'Verified',
  rejected: 'Rejected',
  deleted: 'Deleted',
  reviewNeeded: 'In-Review',
};

export const dashboardButtons = [
  {
    iconName: ICONS.EARNINGS,
    title: 'daily_earns',
    description: 'daily_earns_description',
    screen: ROUTE_NAMES.DAILY_EARNS,
  },
  {
    iconName: ICONS.CRYPTO_BANK,
    title: 'crypto_bank',
    description: 'crypto_bank_description',
    screen: ROUTE_NAMES.CRYPTO_BANK,
  },
];

export const adminModuleCard = [
  {
    iconName: ICONS.DAILY_EARNS,
    title: 'admin_module',
    description: 'allow_see_balances_and_stats',
    screen: ROUTE_NAMES.ADMIN_DASHBOARD,
  },
];

export const cardsAnalytics = [
  {
    iconName: ICONS.CRYPTO_BANK,
    title: 'deposits_and_withdrawals',
    description: 'see_deposits_and_withdrawls_stats',
    screen: ROUTE_NAMES.ANALYTICS,
  },
  {
    iconName: ICONS.CRYPTO_BANK,
    title: 'swap_stats',
    description: 'see_swap_stats',
    screen: ROUTE_NAMES.SWAP_STATS,
  },
];
export const PERCENTAGE = [
  {
    id: '0',
    percentage: '25 %',
  },
  {
    id: '2',
    percentage: '50 %',
  },
  {
    id: '3',
    percentage: '75 %',
  },
  {
    id: '4',
    percentage: '100 %',
  },
];

export const passwordValidations = [
  { id: 1, error: 'Minimum 8 Characters', checked: false },
  { id: 2, error: 'Contains 1 uppercase letter', checked: false },
  { id: 3, error: 'Contains 1 lowercase letter', checked: false },
  { id: 4, error: 'Contains 1 number', checked: false },
  { id: 5, error: 'Contains 1 symbol', checked: false },
];

export const securityNavLinks = [
  {
    title: 'Authenticator App Verification',
    navigate: ROUTE_NAMES.AUTHENTICATOR_APP_VERIFICATION,
  },
  {
    icon: 'mail',
    iconType: Icons.Feather,
    title: 'Email Verification',
    navigate: ROUTE_NAMES.AUTHENTICATOR_EMAIL,
    // navigate: ROUTE_NAMES.EMAIL_VERIFICATION,
  },
  {
    icon: 'call-outline',
    iconType: Icons.Ionicons,

    title: 'Phone Number Verification',
    navigate: ROUTE_NAMES.PHONE_NUMBER_VERIFICATION,
  },
];
export const securityPasswordVerification = {
  icon: 'lock-outline',
  iconType: Icons.MaterialIcons,
  title: 'passwordLabel',
  navigate: ROUTE_NAMES.PASSWORD_VERIFICATION,
};

export const PrivacyES = `
Política de Privacidad y Tratamiento de Datos Personales

Esta Política describe cómo BUSINESS SHOP A&A rige la recopilación, el procesamiento y el uso que hacemos de la Información personal que nos proporciona al acceder o utilizar nuestro sitio web www.businessshop.ai (en adelante, el "Sitio web") y cualquier producto o servicio ofrecido por nosotros (en adelante, " Servicios").
"Información personal" se refiere a la información que identifica a una persona, como el nombre, la dirección, la dirección de correo electrónico entre otros. La “Información personal” no incluye datos anonimizados y/o agregados que no identifiquen a un usuario específico. Estamos comprometidos a proteger y respetar su privacidad. El propósito de esta política de privacidad es describir: i) Los tipos de Información personal que recopilamos y cómo se puede utilizar, ii) Cómo y por qué podemos divulgar su información personal a terceros; iii) La transferencia de su Información Personal; según el cumplimiento de la Ley; iv) Su derecho a acceder, corregir, actualizar y eliminar su Información personal; v) Las medidas de seguridad que utilizamos para proteger y prevenir la pérdida, mal uso o alteración de la Información personal; vi) Nuestra retención de su Información personal; vii) Esta política de privacidad también cubre algunos conceptos básicos de nuestro uso de cookies.
En cumplimiento con las leyes mexicanas y los convenios internacionales vigentes en materia de privacidad y tratamiento de datos personales, supervisamos activamente los métodos de recopilación de su información personal y definimos los propósitos para los cuales empleamos dicha información personal. De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares de México, así como otras disposiciones legales mexicanas aplicables en materia de protección de datos, actuamos como un "responsable de datos" en el sentido de dichas regulaciones.
Recopilación y uso de información personal
Recopilamos la siguiente información personal:
● Información de contacto, como nombre, apellidos, fecha de nacimiento, domicilio, dirección de correo electrónico cuentas de redes sociales.
● Información de la cuenta, como nombre de usuario y contraseña.
● Información de verificación de identidad, como imágenes de su identificación emitida por el gobierno, pasaporte, tarjeta de identificación nacional, licencia de conducir u otros documentos solicitados por nuestro departamento de cumplimiento; o que sea necesario para la validación KYC o AML.
● Información biométrica o datos relacionados con características físicas únicas, tales como huellas dactilares, rasgos faciales particulares o específicos, así como la voz y otros datos físicos unicos
● Información de verificación de residencia, como detalles de facturas de servicios públicos o información similar;
También recopilamos automáticamente cierta información de computadoras, dispositivos y navegación cuando accede al sitio web o utiliza los servicios. Esta información se agrega para proporcionar datos estadísticos sobre las acciones y patrones de navegación de nuestros usuarios, y no identifica personalmente a las personas.
Esta información puede incluir:
● La información sobre la computadora o dispositivo móvil que usa para acceder a nuestro sitio web, incluido el modelo de hardware, el sistema operativo y la versión, el navegador web que usa, las direcciones IP y otros identificadores de dispositivos;
● Información de uso del sitio web, la información de registro del servidor, que puede incluir (pero no se limita a) sus detalles de inicio de sesión, la fecha y hora de las visitas, las páginas visitadas, su dirección IP, el tiempo que pasa en nuestro sitio web y los sitios web que visita justo antes y justo después de nuestro sitio web;
● Las velocidades de carga y descarga del ancho de banda, la cantidad de espacio de almacenamiento libre y utilizado en su dispositivo y otras estadísticas sobre su dispositivo;
● Datos de la cadena de bloques. Datos públicos de blockchain, incluidas direcciones de blockchain e información de transacciones de criptoactivos relacionadas con esas direcciones de blockchain.
● Información agregada. Análisis sobre números agregados de usuarios y tipos de uso (es decir, número de visitas a páginas, recuentos de eventos y métricas de adquisición agregadas) e información como cuántos usuarios en total están utilizando ciertos protocolos con la ayuda de los Servicios; y agregar datos de ubicación entre usuarios, incluidos los países y regiones desde los cuales los usuarios acceden a los Servicios o al Sitio.
Es posible capturar, almacenar y procesar automáticamente información sobre usted, incluso si abandona la finalización de una solicitud en línea o un formulario de registro.
Uso de cookies y tecnología similar
El Sitio Web utiliza Cookies. Las cookies son pequeños archivos de texto que los sitios web que visita colocan en su computadora. Se utilizan ampliamente para hacer que los sitios web funcionen o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio. Las cookies generalmente se almacenan en el disco duro de su computadora.
Nuestro sitio web utiliza cookies para permitirle utilizar el sitio web, los servicios que ofrecemos y los materiales del sitio web. Las cookies también se utilizan para distinguirlo de otros usuarios de nuestro sitio. Esto nos ayuda a brindarle una buena experiencia cuando navega por nuestro sitio y también nos permite mejorar. 
Cómo usamos su información personal
Podemos utilizar su información personal para:
● Procesar sus transacciones. Procesaremos su información personal solo para los fines para los que se nos ha proporcionado;
● Cumplir con nuestros requisitos legales o reglamentarios;
● Verificar su identidad de conformidad con la legislación aplicable, así como atender otras necesidades de aplicación de la ley. También podemos compartir su información con otras instituciones financieras y con las autoridades fiscales si tales acciones nos son requeridas debido a la legislación aplicable;
● Detectar, investigar y prevenir transacciones fraudulentas o actividades no autorizadas o ilegales;
● Proteger nuestros derechos y propiedad;
● Personalizar su experiencia de Servicio;
● Analizar el uso, mejoras y ofertas del sitio web. Analizar y rastrear datos para determinar la utilidad o popularidad de cierto contenido y para comprender mejor la actividad en línea de los usuarios de nuestro sitio web;
● Ayudar a responder a sus solicitudes de servicio al cliente y necesidades de soporte, responder sus consultas o responder a una comunicación suya;
● Contactarlo acerca de los Servicios. La dirección de correo electrónico que proporcione puede usarse para comunicar información y actualizaciones relacionadas con el uso de los Servicios. Ocasionalmente, también podemos comunicar avisos técnicos, soporte o notificaciones administrativas, noticias de la compañía, actualizaciones, promociones e información relacionada con productos y Servicios similares proporcionados por nosotros;
● Administrar un concurso, promoción, encuesta u otras funciones, como se explicará más detalladamente en el sitio web;
● Vincular, conectar o combinar la Información personal que recopilamos de usted o sobre usted con otra Información personal;
● Llevar a cabo cualquier otro propósito o motivo por el cual se recopiló la Información.
No realizamos un seguimiento del comportamiento de las actividades de un cliente en otros sitios web, ni permitimos la recopilación de datos de terceros a través de nuestros servicios.
Si desea dejar de recibir nuestras comunicaciones de marketing, comuníquese con nosotros a privacy@businessshop.ai para darse de baja.

Divulgación y transferencia de información personal
Podemos divulgar su información personal a terceros y autoridades legales y reguladoras, y transferir su información personal como se describe a continuación:
Divulgaciones a terceros
Al procesar sus transacciones, podemos compartir parte de su información personal con nuestros proveedores de servicios externos que ayudan con nuestras operaciones comerciales. Su información no se venderá, intercambiará ni compartirá con terceros sin su consentimiento, excepto para proporcionar Servicios o según lo exija la ley. Al usar el sitio web o los servicios, usted acepta la divulgación de su información personal como se describe en esta política de privacidad. La información del visitante no identificable personalmente se puede proporcionar a terceros para marketing, publicidad u otros usos. Nuestros proveedores de servicios externos están obligados por contrato a proteger y utilizar dicha información sólo para los fines para los que fue divulgada, excepto que la ley exija o permita lo contrario. Nos aseguramos de que dichos terceros están sujetos a términos no menos protectores que los descritos en esta Política de privacidad, o aquellos a los que estamos sujetos según las leyes de protección de datos aplicables.
Divulgaciones a las autoridades legales
Podemos compartir su información personal con las fuerzas del orden, las autoridades de protección de datos, los funcionarios gubernamentales y otras autoridades cuando:
● Obligado por citación, orden judicial, sentencias u otro procedimiento legal;
● Creemos que la divulgación es necesaria para evitar daños físicos o pérdidas financieras;
● La divulgación es necesaria para denunciar una actividad ilegal sospechosa;
● Detectar, investigar y prevenir transacciones fraudulentas o actividades no autorizadas o ilegales;
● La divulgación es necesaria para investigar violaciones de esta política de privacidad o de cualquier acuerdo que tengamos con usted.
Transferencias internacionales de información personal
Almacenamos y procesamos su información personal en centros de datos de todo el mundo, dondequiera que se encuentren nuestras instalaciones o proveedores de servicios. Como tal, podemos transferir su información personal entre dichos centros de datos. Dichas transferencias se realizan de acuerdo con nuestras obligaciones legales y reglamentarias y se realizan únicamente a través de canales protegidos.

Otra circunstancia para la divulgación de información personal
También podemos divulgar su información personal en las siguientes circunstancias:
● Con su consentimiento o bajo sus instrucciones. Cierta información que puede elegir compartir puede mostrarse públicamente, como su nombre de usuario y cualquier contenido que publique cuando use áreas interactivas de nuestro sitio web como nuestros foros en línea;
● Con nuestras empresas matrices, afiliadas, subsidiarias actuales o futuras y con otras empresas bajo control o propiedad común con nosotros o nuestras oficinas a nivel internacional. Nos aseguramos de que las partes enumeradas están sujetas a términos no menos protectores que los descritos en esta Política de privacidad, o aquellos a los que estamos sujetos según las leyes de protección de datos aplicables;
● Si el intercambio de información personal es necesario para la protección de nuestros derechos y propiedad, o los derechos y la propiedad de las empresas matrices, afiliadas, subsidiarias actuales o futuras enumeradas anteriormente y con otras empresas bajo control o propiedad común con nosotros o nuestras oficinas.

Sitios web externos
Ocasionalmente, el sitio web puede proporcionar referencias o enlaces a otros sitios web ("Sitios web externos"). No controlamos estos sitios web externos de terceros ni ninguno de los contenidos que contienen. Usted acepta que de ninguna manera somos responsables de los sitios web externos a los que se hace referencia o se vinculan desde nuestro sitio web, incluidos, entre otros, el contenido del sitio web, las políticas, las fallas, las promociones, los productos, los servicios o las acciones y/o cualquier daño, pérdida, fallas o problemas causados ​​por, relacionados con, o que surjan de esos sitios. Los sitios web externos tienen políticas de privacidad separadas e independientes. Lo alentamos a que revise las políticas, reglas, términos y regulaciones de cada sitio que visite. Buscamos proteger la integridad de nuestro sitio y agradecemos cualquier comentario sobre la información del sitio web externo-proporcionada en nuestro sitio web.
Sus derechos con respecto a su información personal
Sus derechos con respecto a su información personal son fundamentales y están respaldados por la legislación aplicable. Puede ejercer todos los derechos previstos por la ley en relación a sus datos personales, siempre y cuando esto no entre en conflicto con los requisitos legales o nuestras obligaciones de mantenimiento de registros y otras obligaciones legales.
Tiene los siguientes derechos:
● El derecho a ser informado sobre el hecho de que estamos procesando su información personal y qué datos estamos procesando exactamente;
● El derecho a la portabilidad de los datos. En determinadas circunstancias, tiene derecho a obtener toda su información personal que almacenamos en un formato legible por máquina;
● El derecho a objetar el procesamiento de su información personal;
● El derecho a no estar sujeto a la toma de decisiones automatizada, incluida la elaboración de perfiles, si no interviene en la ejecución del contrato entre usted y nosotros;
● El derecho a acceder a su Información Personal, corregir, actualizar y bloquear datos inexactos y/o incorrectos;
● El derecho a retirar su consentimiento para el procesamiento de información personal;
● El derecho a borrar su información personal de nuestros servidores cuando lo solicite justificadamente.
● Y demás derechos intrínsecos otorgados por la ley.
Para ejercer estos derechos, contáctenos en privacy@businessshop.ai
Dentro de los 20 días posteriores a la recepción de su solicitud por escrito (prorrogables hasta 20 días más si es necesario), le proporcionaremos su información personal, incluidos los fines para los que se utilizó y a quién se le reveló de acuerdo con la legislación aplicable. Nos reservamos el derecho de solicitarle información adicional, que pueda ser necesaria para poder dar la debida respuesta a su solicitud de conformidad con la legislación aplicable y usted acepta tal derecho. Además, si desea corregir, actualizar y bloquear datos inexactos y/o incorrectos, tenemos derecho a solicitar una confirmación de los datos correctos, por ejemplo, documentos oficiales que contengan dicha información.
Tenga en cuenta que, si no podemos verificar su identidad mediante mensajes de correo electrónico o en su solicitud al centro de llamadas, o en el caso de dudas razonables con respecto a su identidad, podemos pedirle que proporcione una prueba de identidad, incluso por identificación personal con comparecencia en nuestra oficina. Esta es la única forma en que podemos evitar divulgar su información personal a una persona que pueda violar su identidad.
En algunos casos, no podremos cambiar su información personal. En particular, tal caso puede incluir el evento en que su información personal ya haya sido utilizada durante la ejecución de cualquier acuerdo o transacción, o esté especificada en algún documento oficial, etc.
Tiene derecho a retirar el consentimiento para el procesamiento de datos personales. También puede ejercer su derecho al olvido y borrar su información personal de nuestros servidores. Eliminaremos los Datos Personales que tratamos, excepto aquellos Datos Personales que estemos obligados a almacenar de acuerdo con los requisitos establecidos por la legislación aplicable.
Tenga en cuenta que, en caso de ejercer su derecho de revocación del consentimiento para el procesamiento de datos personales o el derecho al olvido, no podremos proporcionarle nuestros productos o servicios, y tenemos un derecho especial para rescindir todos nuestros actuales acuerdos con usted con la aplicación de las consecuencias legales de dicha terminación, y usted reconoce irrevocablemente tal nuestro derecho.
Para retirar el consentimiento para el procesamiento de datos personales y/o ejercer su derecho al olvido, contáctenos en privacy@businessshop.ai Además, en este caso, por motivos de seguridad, podemos solicitarle que presente su documento de identidad, directamente en nuestra oficina.
Seguridad de la información personal
Utilizamos una variedad de medidas de seguridad para garantizar la confidencialidad de su información personal y para proteger su información personal contra pérdida, robo, acceso no autorizado, mal uso, alteración o destrucción. Estas medidas de seguridad incluyen, pero no se limitan a: Directorios y bases de datos protegidos con contraseña, tecnología Secure Sockets Layered (SSL) para garantizar que su información esté completamente encriptada y enviada a través de Internet de forma segura. Acceso limitado a servidores de alojamiento mediante 2FA y encriptación de tráfico, incorporamos procedimientos de Conozca a su Cliente (KYC) y Prevención de Lavado de Dinero (AML) como parte integral de nuestras prácticas de seguridad y cumplimiento.
Toda la información financiera y/o crediticia se transmite a través de tecnología SSL. Solo el personal autorizado puede acceder a su información personal, y se requiere que este personal trate la información como altamente confidencial. Las medidas de seguridad se revisarán regularmente a la luz de los desarrollos legales y técnicos nuevos y relevantes.
Retención de información personal
Retenemos la información personal durante el tiempo que sea necesario para cumplir con los propósitos descritos en esta política de privacidad, sujeto a nuestras propias obligaciones legales y reglamentarias. De acuerdo con nuestras obligaciones de mantenimiento de registros, conservaremos la cuenta y otra información personal durante al menos cinco años después de la terminación del acuerdo respectivo.
Actualizaciones a esta política de privacidad
Esta Política de Privacidad puede ser revisada, modificada, actualizada y/o complementada en cualquier momento, sin previo aviso, a nuestra entera discreción. Cuando hagamos cambios a esta política de privacidad, notificaremos a todos los usuarios en nuestro sitio web y pondremos a disposición la política de privacidad modificada en nuestro sitio.
Cualquier modificación a esta Política de Privacidad entrará en vigencia una vez que publiquemos los términos actualizados. En todos los casos, su uso continuado de los Servicios o acceso al Sitio después de la publicación de cualquier Política de Privacidad actualizada indica su aceptación de la Política de Privacidad actualizada. 
Delegado de protección de datos
Para ejercer todos los derechos, consultas o quejas pertinentes a cualquier asunto de protección de datos entre usted y nosotros, en primera instancia, comuníquese con nuestro delegado de Protección de Datos en privacy@businessshop.ai  Ultima actualización 26 de octubre de 2023.
`;

export const TermsAndConditionsES = `
Términos y Condiciones de Uso

Los siguientes Términos y Condiciones de uso, en lo adelante “términos” describen las prácticas de manejo de información clave de BUSINESS SHOP A&A en businessshop.ai. Este documento cubre las reglas generales del uso del servicio de cambio de moneda virtual, enumera los principales riesgos y las jurisdicciones prohibidas, describe los procedimientos de reembolso y KYC/AML, e ilustra otros aspectos legales importantes. Antes de utilizar cualquiera de los servicios de BUSINESS SHOP A&A, en lo adelante Business Shop; debe leer, comprender y aceptar estos Términos.
Por favor, lea estos Términos detenidamente. Al aceptar estos Términos y utilizar nuestros servicios, usted acepta estar legalmente obligado por estos Términos y todos los términos incorporados por referencia. Si no está de acuerdo con estos Términos o cualquiera de sus Cláusulas, deberá dejar de utilizar nuestros servicios de inmediato.
1. Disposiciones generales
1.1. Estos Términos regulan las relaciones relacionadas con el uso del sitio web https://www.businessshop.ai/ (en adelante, el “Sitio web”).
1.2. La siguiente terminología se aplica a estos Términos:
"Usuario", "Usted" y "Su" se refieren a usted, la persona física (individuo) que accede al sitio web, utiliza nuestros servicios a través del sitio web y acepta estos Términos.
“Business Shop”, “Servicios”, “Nosotros mismos”, “Nosotros” y “Nos” se refiere a la empresa BUSINESS SHOP A&A, debidamente constituida bajo las leyes de México.
“Parte” se refiere a usted o a nosotros. Para evitar cualquier duda, las Partes contratantes bajo estos Términos son usted y BUSINESS SHOP A&A.
"Activo digital", "Criptomoneda" se refieren a las entradas de datos del libro mayor de software basado en blockchain.
"Intercambio" significa el intercambio de un activo criptográfico por otro o el mismo activo criptográfico, o la conversión de una moneda fiduciaria a una criptomoneda y viceversa.
"Criptoactivos" hace referencia a un tipo de activos que pueden transferirse única y exclusivamente mediante la tecnología de cadena de bloques, incluidos, entre otros, monedas y tokens digitales, y cualquier otro medio digital de intercambio.
"Intercambio de tasa clásica" significa un intercambio de criptomonedas de tasa clásica realizado a la tasa actual más rentable del mercado, a la que el Servicio no garantiza esta tasa.
1.3. Estos Términos son un documento abierto y público. La versión vigente actual de los Términos se encuentra aquí.
1.4. En estos Términos, a menos que se especifique lo contrario, las palabras en singular incluyen el plural y viceversa, y las palabras en género incluyen todos los géneros.
1.5. El usuario acepta que las Condiciones de uso pueden ser actualizadas por BUSINESS SHOP A&A en cualquier momento. Si el usuario no lee y acepta los Términos de Servicio, el Usuario no debe usar o continuar usando los Servicios.

2. Uso de los Servicios
2.1. Al utilizar el sitio web, usted acepta estos Términos y acepta que es responsable del cumplimiento de todas las leyes y reglamentos aplicables.
2.2. Aceptar los términos de la opción de Cambio clásico, también denominada "Tipo de Cambio Clásico", significa que reconoce y acepta la información sobre los tipos de Cambio.
2.3. Business Shop completará el intercambio si se cumplen los siguientes requisitos:
	•	Recibimos el activo criptográfico poco tiempo después de que el Usuario creó el intercambio. Es importante tener en cuenta que un pago transmitido a la red blockchain no significa que Business Shop acepte este pago. Nosotros determinamos el número de confirmaciones de pago en función de la blockchain.

	•	El usuario envió el criptoactivo a una dirección especialmente generada en la página de intercambio. Las direcciones para cada intercambio son desechables y no se pueden volver a utilizar.

	•	El usuario envió la cantidad exacta que se mostró en el sitio web, a la wallet y network correctas, y tuvo en cuenta todas las tarifas de retiro y tarifas de red relevantes.
Si la situación permite un intercambio, la transacción se realizará de acuerdo a las reglas del tipo de cambio clásico.
Si la situación del mercado es tal que la transacción ya no se puede ejecutar, los criptoactivos se reembolsarán, si es posible, menos todas las tarifas aplicables.
Todas las transacciones se realizarán de acuerdo con las reglas de Classic Rate Exchange.
2.4. Cuando intercambia criptoactivos, reconoce y acepta que cooperamos con proveedores de liquidez de terceros y podemos utilizar sus servicios para completar el intercambio.
2.5. Para el intercambio a través de nuestros Servicios, nuestro sistema genera automáticamente una dirección única.
2.6. El sitio web brinda servicios con custodia, lo que significa que almacenamos sus activos digitales.
2.7. Al aceptar estos Términos y utilizar el sitio web, usted declara y garantiza que:
tiene al menos 18 años y tiene plena capacidad para contratar conforme a la ley aplicable; no están ubicados en, bajo el control de, o son nacionales o residentes de las jurisdicciones prohibidas (Sección 10 a continuación); solo está realizando transacciones en el sitio web con fondos obtenidos legalmente que le pertenecen legítimamente; no ha sido suspendido o eliminado previamente del uso del sitio web y nuestros servicios; no está promoviendo, realizando, emprendiendo, participando, ayudando o siendo cómplice de ninguna actividad ilegal a través de su relación con nosotros o a través de su uso del sitio web y nuestros servicios; está cumpliendo y obedeciendo estos Términos y todas las leyes aplicables; utilizará el sitio web y nuestros servicios solo para fines relacionados con el uso personal no comercial y no representa a ningún tercero; usted comprende que participar en el cambio de la Criptomoneda puede ser riesgoso; usted reconoce y acepta que Business Shop no actúa como su corredor, intermediario, agente o asesor o en cualquier capacidad fiduciaria, y ninguna comunicación o información que le proporcione Business Shop se considerará ni interpretará como asesoramiento; no inducirá a error a otros Usuarios y terceros durante el uso del Sitio web; no tomará ninguna acción dirigida únicamente a causar daño a Business Shop u otros terceros; no realizará ingeniería inversa, descompilará ni desmontará de otro modo el sitio web ni ningún software de Business Shop; reconociendo la naturaleza internacional de Internet, usted acepta toda responsabilidad por el cumplimiento de todas las leyes y regulaciones locales relacionadas con sus acciones en la red; usted acepta y da su consentimiento para recibir electrónicamente todas las comunicaciones, acuerdos, documentos, recibos, avisos y divulgaciones que Business Shop proporciona en relación con su uso del sitio web y nuestros servicios; usted comprende y reconoce que cualquier retraso en los servicios es posible; no deberá utilizar proxy y VPN u otro software para ocultar su dirección IP.
2.8. El sitio web es accesible las 24 horas del día, los 7 días de la semana. No obstante, Business Shop se reserva el derecho, sin previo aviso ni compensación, de suspender temporalmente el Sitio Web o el acceso al Sitio Web con el fin de llevar a cabo trabajos que incluyen, pero no se limitan a: actualizaciones, operaciones de mantenimiento y modificación de los servidores, etc.
2.9. Con el fin de proteger la integridad del sitio web, Business Shop se reserva el derecho en cualquier momento, a su exclusivo criterio, de bloquear a los usuarios que violen estos Términos.
3. Procedimiento AML/KYC
3.1. Los Usuarios no necesitan registrarse o iniciar sesión para visualizar el Sitio Web. No obstante, para utilizar los servicios del sistema o realizar operaciones estos deben realizar el registro en la plataforma y pasar por la verificación KYC.
3.2. Al aceptar estos Términos, acepta pasar por el procedimiento AML/KYC, que se le puede aplicar o Business Shop puede solicitar en cualquier momento.
3.3. Durante el procedimiento AML/KYC, Business Shop se reserva el derecho de solicitar información y documentos adicionales, incluidos, entre otros, el escaneo de su documento de identidad válido en su país e información adicional sobre el origen de los fondos.
3.4. En casos limitados (como para verificar su identidad para pasar el procedimiento AML/KYC), nos reservamos el derecho de congelar su transacción de intercambio por cualquier período de tiempo necesario para completar la investigación y el procedimiento AML/KYC.
Mientras la investigación está en curso, Business Shop se reserva el derecho de transferir los fondos congelados a un almacenamiento en frío. Se haría para garantizar su custodia.
 3.5. Si se niega a pasar por el procedimiento AML/KYC o no proporciona a Business Shop los documentos y la información solicitados, Business Shop tiene derecho a negarse a ejecutar sus transacciones (actuales y futuras).
3.6. Al aceptar estos Términos, acepta y garantiza proporcionar información verdadera, precisa, actual y completa sobre usted y asume toda la responsabilidad por su exactitud, integridad y veracidad.
3.7. Para obtener más información, lea las Reglas oficiales de Business Shop contra el lavado de dinero y el control de cumplimiento del financiamiento del terrorismo aquí.
3.8.1. Si el intercambio de un Usuario se detuvo para una verificación KYC debido a una alerta del sistema de gestión de riesgos de Business Shop, Business Shop le proporciona al Usuario un enlace donde puede pasar el procedimiento de verificación de manera segura.
3.8.2. La ventana de tiempo de verificación es de 3 días, y el Usuario puede negarse a pasar el procedimiento; en ese caso, el Usuario no podrá operar.
En casos limitados (si se sospecha que la transacción está relacionada con actividades ilegales), nos reservamos el derecho de congelar los fondos, y las operaciones en curso por cualquier período de tiempo necesario para completar la investigación y el procedimiento AML/KYC.

4. Datos personales
4.1. Al aceptar estos Términos, permite expresamente que Business Shop procese sus datos personales, exporte sus datos personales fuera de la jurisdicción en la que reside o se encuentra.
4.2. Tenemos derecho a transferir algunos datos del Usuario (incluidas las direcciones IP) a nuestros socios comerciales u organismos gubernamentales a petición suya para facilitar la prevención y divulgación de acciones prohibidas o ilegales. Al aceptar estos Términos, usted reconoce y acepta que sus datos personales pueden transferirse de esta manera.
4.3. Para obtener más información, lea la Política de privacidad oficial de Business Shop aquí.

5. Precios, Tipos de Cambio y Confirmaciones
5.1. Las criptomonedas y los activos digitales son altamente experimentales y arriesgados.
5.2. El servicio de conversión de Business Shop intenta proporcionar información precisa sobre el precio y el tipo de cambio, pero esta información es muy volátil y puede cambiar rápidamente sin que los Usuarios necesariamente se den cuenta de estos cambios.
5.3. El valor resultante de cualquier conversión de activos se calculará en el momento en que se efectúe el pago, siguiendo rigurosamente las reglas de cambio según la tasa Clásica. La confirmación del pago generalmente lo consideraremos como "aceptado". Es fundamental recordar que la transmisión de un pago a la red blockchain no implica la aceptación por parte de Business Shop de dicho pago.
5.4. El interés de Business Shop (la remuneración de Business Shop por el uso de sus servicios y/o del Sitio Web) está incluido en la tarifa final de las transacciones de cambio del Usuario. No se necesita pagar tarifas adicionales directamente a Business Shop, a menos que estos Términos indiquen lo contrario.
5.5. Póngase en contacto con el servicio de atención al cliente (hola@businessshop.ai) para obtener más información sobre tipos de cambio y precios.
5.6. Tenga en cuenta que para la tecnología blockchain, las tarifas de red están sujetas a cambios. La tarifa de la red se calculará en el momento que Usted realiza el depósito y no cuando se haya creado su intercambio. Así mismo, si Usted envía un monto de depósito que difiere del especificado durante la creación del intercambio, no podemos garantizar que las tarifas de la red no afectarán la cantidad de criptomonedas que recibirá.
5.7. Impuestos. Es su responsabilidad determinar qué impuestos, si corresponde, se aplican a los cambios que complete a través del sitio web y nuestros servicios, y es su responsabilidad informar y remitir el impuesto correcto a la autoridad fiscal correspondiente. Usted acepta que Business Shop no es responsable de determinar si se aplican impuestos a sus intercambios o de recaudar, informar, retener o remitir los impuestos que surjan de cualquier transacción.

6. Política de devoluciones y reembolsos
6.1. Las criptomonedas y los activos digitales son, por su naturaleza, generalmente irreversibles, y sus tipos de cambio son altamente volátiles y transitorios. No podemos ser responsables de ningún riesgo en el uso del sitio web, incluidos, entre otros, el riesgo de tipo de cambio y el riesgo de mercado. Todas las ventas y transacciones posteriores al intercambio de Business Shop son definitivas y el monto no es reembolsable.
6.2. Si se produce un error en el intercambio o en la interfaz del usuario durante la transacción, la página "Estado del pedido" en el sitio web indicará si el fallo en el intercambio dará lugar o no a un reembolso del activo digital que el usuario había depositado para el intercambio o del activo digital que el usuario estaba intercambiando.
6.3. El activo digital depositado por el usuario se reembolsará al usuario si la página "Estado del pedido": indica que el intercambio falló al mostrar el mensaje "fallido"; o, toda vez que el intercambio se haya atascado en las etapas de "intercambio en espera", "confirmaciones pendientes" o "depósito en espera" o cualquier estado no terminal como "en proceso" "enviando" o similares que no indiquen un estado final, se deberá esperar a que el intercambio se complete o que se determine por un estado definitorio como completado o fallido para proceder en consecuencia según qué casos.
6.4. El Activo digital saliente se intercambiará y enviará al Usuario si la página "Estado del pedido" indica un intercambio exitoso al mostrar "Terminado" o "Completado".
6.5. Cualquier decisión de Business Shop con respecto a reembolsos o cambios es definitiva.
6.6. Tenga en cuenta:
Todas las transacciones de Business Shop a la billetera de activos digitales salientes del Usuario estarán sujetas a todas las tarifas publicadas.
El proceso de extracción de Activos Digitales puede demorar hasta veinte (20) días hábiles. Si el Usuario desea acelerar este proceso, se pueden aplicar cargos adicionales.
Los activos digitales no admitidos que se depositan en nuestro sistema en billeteras no relacionadas no se pueden extraer ni devolver. Business Shop se reserva el derecho de manejar esto caso por caso los gastos operativos, comisiones y demás gravámenes que puedan incurrir durante cada caso serán cubiertos exclusivamente por el Usuario. Cualquier decisión de Business Shop con respecto a dichos Activos digitales que se depositen cuando ya no se admitan son definitivas.
Las transacciones por debajo de los límites mínimos determinados en el sitio web no se pueden completar.
Cuando el Usuario proporciona una dirección de destino, esta es la única dirección a la que se pueden enviar los fondos de salida. Cualquier decisión de Business Shop con respecto a los reembolsos en estas circunstancias es definitiva.
Cuando el Usuario solicita el reembolso, se enviará a la dirección de reembolso especificada en la creación del intercambio únicamente. Para solicitar un reembolso, el Usuario debe comunicarse con el equipo de soporte de Business Shop siempre que no se haya realizado el reembolso de manera automática en (privacy@businessshop.ai). Cualquier decisión de Business Shop con respecto a los reembolsos es definitiva.
ADVERTENCIA: Hay sitios web falsos que se hacen pasar por el sitio web de Business Shop (también conocidos como "estafas de phishing"). Utilizan una URL mal escrita que parece "Businessshop.ai" para engañar a los Usuarios para que les envíen fondos. NO USE NINGÚN SERVICIO QUE NO ESTÉ EXACTAMENTE UBICADO EN EL DOMINIO: “Businessshop.ai”.
Business Shop no es responsable de los fondos que se hayan enviado a estos sitios de phishing falsos. Es importante que todos los Usuarios verifiquen que están visitando la URL correcta (Businessshop.ai) por su cuenta y busquen el certificado de seguridad en la barra de URL de su navegador.
Además, nunca confíe en mensajes privados, solicitudes o solicitudes de fondos de personas que afirman ser Business Shop a menos que haya verificado que se trata de una solicitud oficial de un empleado de Business Shop.
En caso de duda, contáctenos directamente para verificar cualquier mensaje. Sea diligente e informe cualquier estafa de phishing a nuestro equipo privacy@businessshop.ai.
6.7. Si hay algún cambio en el mercado de criptomonedas y el Usuario decide aprovechar la vulnerabilidad del sitio web, Businessshop no puede completar las transacciones de intercambio de dicho Usuario y le devolverá la Criptomoneda y aplicaran las sanciones que Business Shop considere pertinentes.
6.8. Según los informes de víctimas de robo financiero, en casos limitados, Business Shop puede detener los fondos robados de un cliente o una empresa.
Tenga en cuenta que la transacción puede detenerse después de la etapa de negociación, según la hora en que se recibió el informe. En tales casos, podremos devolver los fondos en el activo al que se realizó el intercambio (a moneda). Para devolver dichos fondos, Business Shop necesitará una solicitud de una autoridad encargada del cumplimiento de la ley, que establezca claramente que los fondos mencionados deben devolverse. La copia impresa de la solicitud debe enviarse a nuestra dirección postal: Calle Pargo 500, Costa de Oro, Boca del Rio, entre calle Ave Mantaraya y calle La Blanquilla, Veracruz, México. Envíe una copia digital de la solicitud a privacy@businessshop.ai antes de enviar la solicitud impresa.
Una vez que se recibe la copia impresa, podemos emitir un reembolso a una dirección de reembolso especificada en el intercambio o en la solicitud enviada por la autoridad competente.
6.10. En casos limitados, Business Shop puede almacenar los fondos del Usuario. El período durante el cual Business Shop almacena los fondos del Usuario está limitado a 1 año calendario. Después de eso, Business Shop no puede garantizar la custodia de los fondos no reclamados.
6.11. Las fichas falsas o las fichas de imitación significan fichas que no tienen valor. A pesar de imitar el proyecto existente y tener el mismo nombre o logotipo, dichos tokens no tienen la dirección del contrato del proyecto. Business Shop verifica el contrato del token enviado y, si no coincide con el contrato del token oficial, el sistema no reconocerá el depósito. En caso de recibir tokens falsos o tokens de imitación en su dirección de depósito, Business Shop no cambiará ni devolverá dichos tokens.
6.12. Business Shop acepta solo un depósito por cada intercambio creado, lo que significa que no puede crear simultáneamente múltiples transacciones de intercambio y enviar fondos a varias direcciones de depósito en una transferencia (hash de transacción) si aplica.
6.13. Tenga en cuenta que no podemos garantizar reembolsos en caso de que una criptomoneda sea eliminada o devaluada. Además, si un usuario está siendo investigado por las fuerzas del orden o si existen otras razones para retener los fondos, no podemos garantizar los reembolsos. Queremos dejar en claro que no somos responsables de ninguna pérdida de valor de la criptomoneda durante el período de tenencia y no estamos obligados a proporcionar una compensación.

7. Indemnización
7.1. Usted acepta eximir de responsabilidad e indemnizar a Business Shop de y contra cualquier reclamo de terceros que surja de o esté relacionado de alguna manera con:
su incumplimiento de los Términos; su violación de las leyes, normas o reglamentos aplicables en relación con el sitio web y nuestros servicios, incluyendo cualquier responsabilidad o gasto que surja de todos los reclamos, pérdidas, daños (reales y consecuentes), juicios, costos de litigios de todo tipo y naturaleza.

8. Descargos de responsabilidad
8.1. Nada en estos términos excluye o limitará la garantía o la responsabilidad de Business Shop por pérdidas que no puedan excluirse o limitarse legalmente por la ley aplicable.
8.2. Usted entiende y acepta expresamente que su uso del sitio web y nuestro servicio es bajo su propio riesgo y que los servicios del sitio web se proporcionan "tal cual" y "según disponibilidad" sin garantías de ningún tipo, ya sea explícita o implícita.
8.3. En la medida máxima permitida por la ley aplicable, Business Shop no ofrece garantías expresas y renuncia a todas las garantías implícitas con respecto al sitio web, los servicios o cualquier aplicación o sitios externos, incluidas las garantías implícitas de comerciabilidad, idoneidad para un fin determinado, corrección de no violación, y confiabilidad.
8.4. Sin limitar la generalidad de lo anterior, Business Shop no representa ni garantiza que: (a) su uso del sitio web y los servicios cumplirá con sus requisitos, (b) su uso del sitio web y los servicios será ininterrumpido, oportuno, seguro o libre de errores, (c) los datos proporcionados a través del sitio web serán exactos o (d) el sitio web o cualquier contenido disponible en o a través del sitio web están libres de virus u otros componentes dañinos.

9. Limitación de responsabilidad
9.1. Sujeto a la sección 8 anterior, usted entiende y acepta que Business Shop no será responsable ante usted por ningún daño indirecto, incidental, especial consecuente o ejemplar que pueda sufrir, sin importar su causa y bajo cualquier teoría de responsabilidad, incluyendo, entre otros a cualquier pérdida de ganancias (ya sea incurrida directa o indirectamente), cualquier pérdida de fondo de comercio o reputación comercial, cualquier pérdida de datos sufridos, costo de adquisición de bienes o servicios sustitutos u otra pérdida intangible, incluso si Business Shop ha sido advertido de la posibilidad de tales daños.
9.2. Las limitaciones de responsabilidad anteriores se aplicarán ya sea que la supuesta responsabilidad o Pérdidas se basen en un contrato, negligencia, agravio, responsabilidad estricta o cualquier otra base.

10. Jurisdicciones prohibidas
10.1. Al acceder y utilizar los servicios de Business Shop y el sitio web, declara y garantiza que no se encuentra en, ni es ciudadano o residente de los Estados Unidos de América, o un país sujeto a las Listas de Sanciones de las Naciones Unidas y su equivalente, o un país donde el uso de criptomonedas está prohibido por la ley aplicable.
10.2. Business Shop mantiene el derecho de seleccionar sus mercados y jurisdicciones para operar y puede restringir o denegar sus servicios a ciertos países.
10.3. Business Shop también se reserva el derecho a utilizar diversos métodos para impedir el uso del Sitio Web y sus servicios por parte de los Usuarios mencionados anteriormente. Debe cumplir con esta Sección, incluso si los métodos de Business Shop para evitar el uso de sus servicios y el sitio web no son efectivos o pueden eludirse.
10.4. Business Shop puede embargar los fondos de los Usuarios en estas jurisdicciones y donarlos a una organización benéfica a su exclusivo criterio.
10.5. El uso del sitio web es nulo donde lo prohíba la ley aplicable.
10.6. Business Shop tiene derecho a obtener su dirección IP. Si la dirección IP se asigna en la jurisdicción prohibida, Business Shop puede negarle el acceso al sitio web y la prestación de servicios.

11. Uso permitido
11.1. El uso del sitio web puede conllevar un riesgo.
11.2. Al acceder o utilizar el sitio web, usted acepta que no violará ninguna ley, contrato, propiedad intelectual u otro derecho de terceros ni cometerá un acto ilícito, y que es el único responsable de su conducta mientras utiliza el sitio web y nuestros servicios.
11.3. Sin limitar la generalidad de lo anterior, usted acepta que no: dañar, deshabilitar, sobrecargar o perjudicar el funcionamiento del Sitio Web de cualquier manera; usar el sitio web y nuestros servicios para pagar, apoyar o participar en cualquier actividad ilegal (como actividades de juego ilegal, fraude, lavado de dinero o actividades terroristas); usar cualquier robot, araña, rastreador, raspador u otro medio o interfaz automatizado no proporcionado por nosotros para acceder al sitio web o para extraer datos; no distribuirá virus, gusanos, defectos, caballos de Troya, archivos dañados, engaños o cualquier otro elemento de naturaleza destructiva o engañosa.

12. Terminación
12.1. Estos Términos entrarán en vigor para el Usuario desde la utilización del Sitio Web y estarán vigentes por tiempo indefinido.
12.2. Business Shop se reserva el derecho de suspender, cancelar o bloquear su acceso al sitio web por cualquier motivo, incluido, entre otros, el incumplimiento de estos Términos, a su exclusivo y absoluto criterio, de inmediato, sin previo aviso y sin responsabilidad.
12.3. Business Shop no dará razones de sus acciones.
12.4. Tras la rescisión de estos Términos, las Secciones 2 a 11, 14 a 17 seguirán vigentes.

13. Modificación del sitio web
13.1. Business Shop cambia y mejora constantemente el sitio web y sus servicios.
13.2. Business Shop tiene derecho a agregar o eliminar funcionalidades o características del sitio web, o agregar o crear nuevos límites para usar el sitio web y sus servicios en cualquier momento.

14. Ley Aplicable y Arbitraje
14.1. Estos Términos se rigen por las leyes de México. Estos Términos deben tratarse en todos los aspectos como un contrato de México.
14.2. Usted y nosotros nos sometemos de manera irrevocable e incondicional a la jurisdicción, el lugar y el foro exclusivos de México, y a todos los tribunales competentes para conocer de las apelaciones.

15. Enlaces a sitios de terceros
15.1. El Sitio Web puede contener enlaces o proporcionar acceso a sitios de terceros y al contenido que se muestra en dichos sitios que es el resultado de la actividad intelectual de terceros y está protegido de acuerdo con las leyes aplicables. Business Shop no verifica estos sitios y el contenido que se muestra en ellos para verificar el cumplimiento de las leyes aplicables. Business Shop no es responsable de ninguna información o contenido que se muestre en dichos sitios a los que el usuario tenga acceso a través del sitio web, incluidas las opiniones o declaraciones expresadas en dichos sitios de terceros.
15.2. El Usuario confirma que, dado que el Usuario pasará al enlace en el Sitio web al sitio del tercero, las relaciones entre Business Shop y el Usuario terminarán y Business Shop no es responsable de la exactitud de la información que se muestra en los sitios web de los terceros, el uso de los servicios y contenidos de terceros por parte del Usuario, la validez de dicho uso y la calidad de los servicios y contenidos mostrados en los sitios de terceros.

16. Protección de derechos de autor
16.1. El uso del sitio web no le otorga la propiedad de ningún derecho de propiedad intelectual en el sitio web, ningún software o el contenido al que accede.
16.2. Los materiales contenidos en el sitio web están protegidos por las leyes y tratados de derechos de autor y marcas registradas aplicables.
16.3. El uso de consultas de búsqueda que comprendan un nombre de dominio directo o el nombre de la marca como (entre otros), Businessshop.io, Business Shop, etc. está prohibido.

17. Modificaciones
17.1. Business Shop se reserva el derecho de cambiar, enmendar o modificar estos Términos en cualquier momento. Le enviaremos un aviso de dichos cambios actualizando la fecha de "Última actualización" en la parte superior de estos Términos. Los Términos actualizados entrarán en vigor inmediatamente después de su publicación en el sitio web.
17.2. Al usar el sitio web, usted acepta estar sujeto a la versión vigente en ese momento de estos Términos. Por la presente, continuación del uso del sitio web después de La realización de cambios o enmiendas a estos Términos significa la aceptación por parte del Usuario de dichos cambios o enmiendas y, por lo tanto, el Usuario deberá monitorear regularmente los cambios en estos Términos.

18. Asignación
18.1. Business Shop puede transferir los derechos y obligaciones bajo estos Términos a terceros sin el consentimiento adicional del Usuario.
18.2. El Usuario tiene derecho a ceder sus derechos y obligaciones bajo estos Términos a cualquier tercero solo con el consentimiento previo por escrito de Business Shop.

19. Acuerdo completo
Estos Términos constituyen el acuerdo completo entre las Partes y reemplazan cualquier arreglo o acuerdo anterior entre ellas en relación con las transacciones contempladas en estos Términos.

20. Separación y Validez
20.1. Si alguna disposición de estos Términos es o se vuelve ilegal, inválida o inaplicable en cualquier aspecto bajo la ley de cualquier jurisdicción relevante, dicha disposición se considerará separada de estos Términos y será reemplazada por una que tenga un efecto lo más cercano posible a la provisión deficiente.
20.2. Las disposiciones restantes de estos Términos permanecerán en pleno vigor.

21. Costos
21.1. De vez en cuando, Business Shop puede necesitar dedicar tiempo a resolver los problemas que nos presentan los Usuarios. Cuando el problema de cualquier Usuario no sea causado por nuestra negligencia o descuido, nos reservamos el derecho de recuperar los costos administrativos razonables gastados para abordar el problema del Usuario.
21.2. Salvo disposición en contrario en estos Términos, cada Parte pagará sus propios costos y gastos en relación con la negociación, preparación y ejecución de estos Términos.

22. Varios
22.1. Nada en estos Términos se interpretará como la creación de una empresa conjunta, una relación de agencia o una sociedad legal entre las Partes.
22.2. Business Shop tiene derecho a involucrar a terceros para el cumplimiento de sus obligaciones.
`;

export const TermsAndConditionsEN = `
Terms and Conditions of Use

The following Terms and Conditions of Use, hereinafter referred to as "terms," describe the key information handling practices of BUSINESS SHOP A&A at businessshop.ai. This document covers the general rules for using the virtual currency exchange service, lists the main risks and prohibited jurisdictions, outlines refund and KYC/AML procedures, and illustrates other important legal aspects. Before using any of the services provided by BUSINESS SHOP A&A, hereinafter referred to as Business Shop, you must read, understand, and accept these Terms.

Please read these Terms carefully. By accepting these Terms and using our services, you agree to be legally bound by these Terms and all the terms incorporated by reference. If you do not agree with these Terms or any of their clauses, you must immediately cease using our services.
1. General Provisions
1.1. These Terms regulate the relationships related to the use of the website https://www.businessshop.ai/ (hereinafter, the "Website").
1.2. The following terminology applies to these Terms:
"User," "You," and "Your" refer to you, the individual person who accesses the website, uses our services through the website, and accepts these Terms.
"Business Shop," "Services," "Ourselves," "We," and "Us" refer to the company BUSINESS SHOP A&A, duly incorporated under the laws of Mexico.
"Party" refers to either you or us. To avoid any doubt, the contracting parties under these Terms are you and BUSINESS SHOP A&A.
"Digital Asset," "Cryptocurrency" refer to data entries in the blockchain-based ledger.
"Exchange" means the exchange of one cryptographic asset for another or the same cryptographic asset, or the conversion of fiat currency to cryptocurrency and vice versa.
"Cryptoassets" refer to a type of assets that can be transferred solely and exclusively through blockchain technology, including, among others, digital coins and tokens, and any other digital means of exchange.
"Classic Rate Exchange" means an exchange of cryptocurrencies at the current most profitable market rate, for which the Service does not guarantee this rate.
1.3. These Terms are an open and public document. The current version of the Terms can be found here.
1.4. In these Terms, unless otherwise specified, singular words include the plural and vice versa, and gender-specific words include all genders.
1.5. The user acknowledges that the Terms of Use may be updated by BUSINESS SHOP A&A at any time. If the user does not read and accept the Terms of Service, the User should not use or continue to use the Services.

2. Use of the Services
2.1. By using the website, you agree to these Terms and acknowledge that you are responsible for compliance with all applicable laws and regulations.
2.2. Accepting the terms of the Classic Exchange option, also referred to as the "Classic Exchange Rate," means you acknowledge and accept the information regarding exchange rates.
2.3. Business Shop will complete the exchange if the following requirements are met:
• We receive the cryptographic asset shortly after the User creates the exchange. It is essential to note that a payment transmitted to the blockchain network does not mean that Business Shop accepts this payment. We determine the number of payment confirmations based on the blockchain.
• The user sent the cryptoasset to a specially generated address on the exchange page. Addresses for each exchange are disposable and cannot be reused.

• The user sent the exact amount displayed on the website to the correct wallet and network, taking into account all relevant withdrawal fees and network fees.
If the situation allows for an exchange, the transaction will be carried out according to the rules of the Classic Rate Exchange.
If the market situation is such that the transaction can no longer be executed, cryptoassets will be refunded, if possible, minus all applicable fees.
All transactions will be conducted in accordance with the rules of the Classic Rate Exchange.
2.4. When exchanging cryptoassets, you acknowledge and accept that we cooperate with third-party liquidity providers and may use their services to complete the exchange.
2.5. For the exchange through our Services, our system automatically generates a unique address.
2.6. The website provides custodial services, meaning we store your digital assets.
2.7. By accepting these Terms and using the website, you represent and warrant that:
you are at least 18 years old and have full legal capacity to enter into contracts under applicable law; you are not located in, under the control of, or a national or resident of prohibited jurisdictions (Section 10 below); you are only conducting transactions on the website with legally obtained funds that belong to you legitimately; you have not been previously suspended or removed from using the website and our services; you are not promoting, engaging in, undertaking, participating in, aiding, or abetting any illegal activity through your relationship with us or through your use of the website and our services; you are complying with and obeying these Terms and all applicable laws; you will use the website and our services solely for non-commercial personal use and do not represent any third party; you understand that engaging in Cryptocurrency exchange can be risky; you acknowledge and accept that Business Shop does not act as your broker, intermediary, agent, or advisor or in any fiduciary capacity, and no communication or information provided by Business Shop will be considered or construed as advice; you will not mislead other Users and third parties while using the website; you will not take actions aimed solely at causing harm to Business Shop or other third parties; you will not reverse engineer, decompile, or otherwise disassemble the website or any Business Shop software; recognizing the international nature of the Internet, you accept all responsibility for complying with all local laws and regulations related to your actions on the network; you accept and consent to receiving electronically all communications, agreements, documents, receipts, notices, and disclosures that Business Shop provides in connection with your use of the website and our services; you understand and acknowledge that delays in the services are possible; you shall not use proxy and VPN or other software to conceal your IP address.
2.8. The website is accessible 24 hours a day, 7 days a week. However, Business Shop reserves the right, without prior notice or compensation, to temporarily suspend the Website or access to the Website in order to carry out tasks including, but not limited to: updates, maintenance operations, and server modifications, etc.
2.9. To protect the integrity of the website, Business Shop reserves the right at any time, at its sole discretion, to block users who violate these Terms.

3. AML/KYC Procedure
3.1. Users do not need to register or log in to view the Website. However, to use the system's services or conduct transactions, they must register on the platform and go through the KYC verification.
3.2. By accepting these Terms, you agree to undergo the AML/KYC procedure, which may be applied to you, or Business Shop may request it at any time.
3.3. During the AML/KYC procedure, Business Shop reserves the right to request additional information and documents, including, but not limited to, a scan of your valid identification document in your country and additional information about the source of funds.
3.4. In limited cases (such as to verify your identity for the AML/KYC procedure), we reserve the right to freeze your exchange transaction for any necessary period to complete the investigation and AML/KYC procedure. While the investigation is ongoing, Business Shop reserves the right to transfer the frozen funds to cold storage for safekeeping.
3.5. If you refuse to undergo the AML/KYC procedure or do not provide Business Shop with the requested documents and information, Business Shop has the right to refuse to execute your transactions (current and future).
3.6. By accepting these Terms, you agree and warrant to provide true, accurate, current, and complete information about yourself and assume all responsibility for its accuracy, completeness, and truthfulness.
3.7. For more information, please read the official Business Shop Anti-Money Laundering and Counter-Terrorist Financing Compliance Rules here.
3.8. If a User's exchange is paused for KYC verification due to a risk management alert from Business Shop's system, Business Shop provides the User with a link where they can safely undergo the verification procedure.
3.8.1. The verification time window is 3 days, and the User may choose to decline the procedure; in that case, the User will not be able to operate. In limited cases (if there is suspicion that the transaction is related to illegal activities), we reserve the right to freeze the funds and ongoing operations for any necessary period to complete the investigation and AML/KYC procedure.

4. Personal Data
4.1. By accepting these Terms, you expressly allow Business Shop to process your personal data and export your personal data outside the jurisdiction in which you reside or are located.
4.2. We have the right to transfer certain User data (including IP addresses) to our business partners or government agencies upon their request to facilitate the prevention and disclosure of prohibited or illegal actions. By accepting these Terms, you acknowledge and accept that your personal data may be transferred in this manner.
4.3. For more information, please read the official Privacy Policy of Business Shop here.

5. Prices, Exchange Rates, and Confirmations
5.1. Cryptocurrencies and digital assets are highly experimental and risky.
5.2. Business Shop's conversion service attempts to provide accurate information about price and exchange rate, but this information is highly volatile and can change rapidly without Users necessarily being aware of these changes.
5.3. The resulting value of any asset conversion will be calculated at the time of payment, strictly following the exchange rules according to the Classic Rate. Payment confirmation is generally considered as "accepted." It is essential to remember that the transmission of payment to the blockchain network does not imply acceptance by Business Shop of such payment.
5.4. Business Shop's interest (Business Shop's compensation for the use of its services and/or the Website) is included in the final fee for User exchange transactions. No additional fees need to be paid directly to Business Shop unless these Terms indicate otherwise.
5.5. Please contact customer service (hola@businessshop.ai) for more information on exchange rates and prices.
5.6. Note that for blockchain technology, network fees are subject to change. The network fee will be calculated at the time you make the deposit and not when your exchange is created. Likewise, if you send a deposit amount different from what was specified during the creation of the exchange, we cannot guarantee that network fees will not affect the amount of cryptocurrency you will receive.
5.7. Taxes. It is your responsibility to determine which taxes, if any, apply to the exchanges you complete through the website and our services, and it is your responsibility to report and remit the correct tax to the relevant tax authority. You agree that Business Shop is not responsible for determining whether taxes apply to your exchanges or for collecting, reporting, withholding, or remitting taxes arising from any transaction.

6. Return and Refund Policy
6.1. Cryptocurrencies and digital assets are, by their nature, generally irreversible, and their exchange rates are highly volatile and transitory. We cannot be responsible for any risks in the use of the website, including, among others, exchange rate risk and market risk. All sales and transactions following Business Shop's exchange are final, and the amount is non-refundable.
6.2. If an error occurs in the exchange or in the user interface during the transaction, the "Order Status" page on the website will indicate whether the exchange failure will result in a refund of the digital asset that the user had deposited for the exchange or the digital asset the user was exchanging.
6.3. The digital asset deposited by the user will be refunded to the user if the "Order Status" page indicates that the exchange failed by displaying the message "failed"; or, whenever the exchange is stuck in the stages of "exchange pending," "pending confirmations," or "deposit pending," or any non-terminal state such as "in process," "sending," or similar that do not indicate a final state, it must be awaited for the exchange to be completed or determined by a definitive state such as completed or failed to proceed accordingly depending on the cases.
6.4. Outgoing digital asset will be exchanged and sent to the User if the "Order Status" page indicates a successful exchange by displaying "Finished" or "Completed."
6.5. Any decision by Business Shop regarding refunds or exchanges is final.
6.6. Please note:
All Business Shop transactions to the User's outgoing digital asset wallet are subject to all published fees.
The process of withdrawing Digital Assets may take up to twenty (20) business days. If the User wishes to expedite this process, additional fees may apply.
Unsupported digital assets deposited into our system in unrelated wallets cannot be withdrawn or returned. Business Shop reserves the right to handle this on a case-by-case basis, and operational expenses, fees, and other charges that may be incurred during each case will be solely covered by the User. Any decision by Business Shop regarding such unsupported Digital Assets that are deposited when they are no longer supported is final.
Transactions below the minimum limits specified on the website cannot be completed.
When the User provides a destination address, this is the only address to which outgoing funds can be sent. Any decision by Business Shop regarding refunds in these circumstances is final.
When the User requests a refund, it will be sent to the refund address specified in the exchange creation only. To request a refund, the User must contact the Business Shop support team unless the refund has been automated at (privacy@businessshop.ai). Any decision by Business Shop regarding refunds is final.
WARNING: There are fake websites pretending to be Business Shop (also known as "phishing scams"). They use a misspelled URL that looks like "Businessshop.ai" to trick Users into sending them funds. DO NOT USE ANY SERVICE THAT IS NOT EXACTLY LOCATED AT THE DOMAIN: "Businessshop.ai."
Business Shop is not responsible for funds sent to these fake phishing sites. It's essential for all Users to verify that they are visiting the correct URL (Businessshop.ai) on their own and look for the security certificate in their browser's URL bar.
Additionally, never trust private messages, requests, or fund requests from people claiming to be Business Shop unless you have verified it is an official request from a Business Shop employee. When in doubt, contact us directly to verify any message. Be diligent and report any phishing scams to our team at privacy@businessshop.ai.
6.7. If there is any change in the cryptocurrency market and the User decides to take advantage of the website's vulnerability, Business Shop may not complete the exchange transactions of such User and will refund the Cryptocurrency and apply the sanctions that Business Shop deems appropriate.
6.8. According to reports of victims of financial theft, in limited cases, Business Shop may stop the stolen funds of a customer or a company. Please note that the transaction may stop after the trading stage, depending on the time the report was received. In such cases, we may return the funds in the asset to which the exchange was made (in currency). To return such funds, Business Shop will need a request from a law enforcement authority clearly stating that the mentioned funds should be returned. A hard copy of the request must be sent to our postal address: Pargo 500 Street, Costa de Oro, Boca del Rio, between Ave Mantaraya Street and La Blanquilla Street, Veracruz, Mexico. A digital copy of the request must be sent to privacy@businessshop.ai before sending the hard copy request.
Once the hard copy is received, we may issue a refund to a refund address specified in the exchange or in the request from the competent authority.
6.9. In limited cases, Business Shop may store the User's funds. The period during which Business Shop stores the User's funds is limited to one calendar year. After that, Business Shop cannot guarantee the custody of unclaimed funds.
6.10. Fake tokens or imitation tokens mean tokens that have no value. Despite imitating the existing project and having the same name or logo, such tokens do not have the contract address of the project. Business Shop verifies the sent token contract, and if it does not match the official token contract, the system will not recognize the deposit. In case of receiving fake tokens or imitation tokens in your deposit address, Business Shop will not exchange or return such tokens.
6.11. Business Shop accepts only one deposit per exchange created, which means that you cannot create multiple exchange transactions simultaneously and send funds to multiple deposit addresses in one transfer (transaction hash) if applicable.
6.12. Please note that we cannot guarantee refunds in the event that a cryptocurrency is delisted or devalued. Additionally, if a user is under investigation by law enforcement or if there are other reasons to hold the funds, we cannot guarantee refunds. We want to make it clear that we are not responsible for any loss in cryptocurrency value during the holding period and are not obligated to provide compensation.

7. Indemnification
7.1. You agree to release and indemnify Business Shop from and against any third-party claims arising out of or related in any way to:

Your breach of the Terms; Your violation of applicable laws, rules, or regulations in connection with the website and our services, including any liability or expense arising from all claims, losses, damages (actual and consequential), judgments, litigation costs of all kinds and nature.

8. Disclaimers
8.1. Nothing in these terms excludes or limits Business Shop's warranty or liability for losses that cannot be legally excluded or limited by applicable law.
8.2. You understand and expressly agree that your use of the website and our service is at your own risk, and the website's services are provided "as is" and "as available" without warranties of any kind, whether express or implied.
8.3. To the maximum extent permitted by applicable law, Business Shop does not make express warranties and disclaims all implied warranties regarding the website, the services, or any external applications or sites, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, and reliability.
8.4. Without limiting the generality of the foregoing, Business Shop does not represent or warrant that: (a) your use of the website and services will meet your requirements, (b) your use of the website and services will be uninterrupted, timely, secure, or error-free, (c) data provided through the website will be accurate, or (d) the website or any content available on or through the website is free of viruses or other harmful components.

9. Limitation of Liability
9.1. Subject to Section 8 above, you understand and agree that Business Shop shall not be liable to you for any indirect, incidental, special, consequential, or exemplary damages you may suffer, regardless of the cause and under any theory of liability, including, among others, any loss of profits (whether incurred directly or indirectly), any loss of goodwill or business reputation, any loss of data suffered, cost of procurement of substitute goods or services, or other intangible loss, even if Business Shop has been advised of the possibility of such damages.
9.2. The foregoing limitations of liability shall apply whether the alleged liability or losses are based on contract, negligence, tort, strict liability, or any other basis.

10. Prohibited Jurisdictions
10.1. By accessing and using Business Shop's services and the website, you declare and warrant that you are not in, nor a citizen or resident of the United States of America, or a country subject to the United Nations Sanctions Lists or its equivalent, or a country where the use of cryptocurrencies is prohibited by applicable law.
10.2. Business Shop maintains the right to select its markets and jurisdictions to operate in and may restrict or deny its services to certain countries.
10.3. Business Shop also reserves the right to use various methods to prevent the use of the Website and its services by the Users mentioned above. You must comply with this Section, even if Business Shop's methods to prevent the use of its services and the website are not effective or can be circumvented.
10.4. Business Shop may confiscate the funds of Users in these jurisdictions and donate them to a charitable organization at its sole discretion.
10.5. The use of the website is null and void where prohibited by applicable law.
10.6. Business Shop has the right to obtain your IP address. If the IP address is assigned in a prohibited jurisdiction, Business Shop may deny you access to the website and the provision of services.

11. Permitted Use
11.1. The use of the website may involve risks.
11.2. By accessing or using the website, you agree not to violate any law, contract, intellectual property, or other rights of third parties or commit an unlawful act, and that you are solely responsible for your conduct while using the website and our services.
11.3. Without limiting the generality of the foregoing, you agree not to: damage, disable, overburden, or impair the operation of the Website in any way; use the website and our services to pay, support, or engage in any illegal activity (such as illegal gambling, fraud, money laundering, or terrorist activities); use any robot, spider, crawler, scraper, or other automated means or interface not provided by us to access the website or to extract data; distribute viruses, worms, defects, Trojan horses, corrupted files, deceptive files, or any other destructive or deceptive elements.

12. Termination
12.1. These Terms will become effective for the User upon the use of the Website and will be in effect indefinitely.
12.2. Business Shop reserves the right to suspend, cancel, or block your access to the website for any reason, including but not limited to a breach of these Terms, at its sole and absolute discretion, immediately, without prior notice, and without liability.
12.3. Business Shop will not provide reasons for its actions.
12.4. Upon the termination of these Terms, Sections 2 to 11, 14 to 17 will remain in effect.

13. Modification of the Website
13.1. Business Shop continually changes and improves the website and its services.
13.2. Business Shop has the right to add or remove functionalities or features from the website, or add or create new limitations for using the website and its services at any time.

14. Applicable Law and Arbitration
14.1. These Terms are governed by the laws of Mexico. These Terms should be treated in all respects as a contract of Mexico.
14.2. You and we irrevocably and unconditionally submit to the exclusive jurisdiction, venue, and forum of Mexico, and to all competent courts to hear appeals.

15. Links to Third-Party Sites
15.1. The Website may contain links or provide access to third-party sites and the content displayed on such sites that result from the intellectual activity of third parties and is protected in accordance with applicable laws. Business Shop does not verify these sites and the content displayed on them to check compliance with applicable laws. Business Shop is not responsible for any information or content displayed on such sites to which the user gains access through the website, including the opinions or statements expressed on such third-party sites.
15.2. The User acknowledges that since the User will move from the link on the Website to the third party's site, the relationship between Business Shop and the User will terminate, and Business Shop is not responsible for the accuracy of the information displayed on third-party websites, the User's use of third-party services and content, the validity of such use, and the quality of the services and content displayed on third-party sites.

16. Copyright Protection
16.1. The use of the website does not grant you ownership of any intellectual property rights on the website, any software, or the content you access.
16.2. The materials contained on the website are protected by applicable copyright and trademark laws and treaties.
16.3. The use of search queries that include a direct domain name or brand name, such as (among others), Businessshop.io, Business Shop, etc., is prohibited.

17. Modifications
17.1. Business Shop reserves the right to change, amend, or modify these Terms at any time. We will notify you of such changes by updating the "Last Updated" date at the top of these Terms. The updated Terms will take effect immediately after being posted on the website.
17.2. By using the website, you agree to be bound by the then-current version of these Terms. Your continued use of the website after changes or amendments to these Terms means acceptance by the User of such changes or amendments, and therefore, the User should regularly monitor changes to these Terms.

18. Assignment
18.1. Business Shop may transfer the rights and obligations under these Terms to third parties without additional consent from the User.
18.2. The User has the right to assign its rights and obligations under these Terms to any third party only with the prior written consent of Business Shop.

19. Entire Agreement
These Terms constitute the entire agreement between the Parties and supersede any prior arrangement or agreement between them concerning the transactions contemplated by these Terms.

20. Severability and Validity
20.1. If any provision of these Terms is or becomes illegal, invalid, or unenforceable in any respect under the law of any relevant jurisdiction, such provision will be deemed severed from these Terms and will be replaced by one that has the closest possible effect to the deficient provision.
20.2. The remaining provisions of these Terms will remain in full force.

21. Costs
21.1. From time to time, Business Shop may need to spend time addressing issues presented to us by Users. When a User's problem is not caused by our negligence or oversight, we reserve the right to recover reasonable administrative costs spent to address the User's issue.
21.2. Unless otherwise provided in these Terms, each Party will bear its own costs and expenses in connection with the negotiation, preparation, and execution of these Terms.

22. Miscellaneous
22.1. Nothing in these Terms will be construed as creating a joint venture, agency relationship, or legal partnership between the Parties.
22.2. Business Shop has the right to involve third parties in fulfilling its obligations.



Last updated on October 26, 2023.

`;

export const PrivacyEN = `
Privacy Policy and Personal Data Processing

This Policy describes how BUSINESS SHOP A&A governs the collection, processing, and use of personal information that you provide when accessing or using our website www.businessshop.ai (hereinafter, the "Website") and any product or service offered by us (hereinafter, "Services").
"Personal information" refers to data that identifies a person, such as their name, address, email address, among others. "Personal information" does not include anonymized and/or aggregated data that does not identify a specific user. We are committed to protecting and respecting your privacy. The purpose of this privacy policy is to describe: i) the types of personal information we collect and how it can be used, ii) how and why we may disclose your personal information to third parties; iii) the transfer of your Personal Information; according to compliance with the Law; iv) your right to access, correct, update, and delete your personal information; v) the security measures we use to protect and prevent the loss, misuse, or alteration of personal information; vi) our retention of your personal information; vii) This privacy policy also covers some basics of our use of cookies.
In compliance with Mexican laws and international agreements in privacy and personal data processing, we actively monitor the methods of collecting your personal information and define the purposes for which we employ such personal information. In accordance with the Federal Law on the Protection of Personal Data Held by Private Parties of Mexico, as well as other applicable Mexican legal provisions concerning data protection, we act as a "data controller" in the sense of such regulations.

Collection and Use of Personal Information

We collect the following personal information:
● Contact information, such as your name, last name, date of birth, address, email address, and social media accounts.
● Account information, such as your username and password.
● Identity verification information, including images of your government-issued identification, passport, national identification card, driver's license, or other documents requested by our compliance department or necessary for KYC (Know Your Customer) or AML (Anti-Money Laundering) validation.
● Biometric information or data related to unique physical characteristics, such as fingerprints, specific facial features, voice, and other unique physical data.
● Residence verification information, such as utility bill details or similar information.
We also automatically collect certain information from computers, devices, and browsing when you access the website or use our services. This information is aggregated to provide statistical data on user actions and browsing patterns, and it does not personally identify individuals. This information may include:

● Information about the computer or mobile device you use to access our website, including hardware model, operating system, version, web browser, IP addresses, and other device identifiers.
● Website usage information, server log information, which may include (but is not limited to) your login details, visit date and time, pages visited, your IP address, the time you spend on our website, and the websites you visit just before and after our website.
● Bandwidth upload and download speeds, the amount of free and used storage space on your device, and other device statistics.
● Blockchain data. Public blockchain data, including blockchain addresses and cryptocurrency transaction information related to those blockchain addresses.
● Aggregated information. Analysis of aggregate user numbers and usage types (e.g., page visit counts, aggregated event counts, and acquisition metrics) and information such as the total number of users using certain protocols with the help of the Services. Also, aggregate location data among users, including countries and regions from which users access the Services or the Site.
It's possible to automatically capture, store, and process information about you even if you abandon the completion of an online request or registration form.
Use of Cookies and Similar Technologies

The Website uses cookies. Cookies are small text files that websites you visit place on your computer. They are widely used to make websites work or work more efficiently and to provide information to site owners. Cookies are usually stored on your computer's hard drive.
Our website uses cookies to enable you to use the website, the services we offer, and the website materials. Cookies are also used to distinguish you from other users of our site. This helps us provide you with a good experience when you browse our site and also allows us to make improvements.

How We Use Your Personal Information

We may use your personal information to:
● Process your transactions. We will process your personal information only for the purposes for which it has been provided to us.
● Comply with our legal or regulatory requirements.
● Verify your identity in accordance with applicable laws and address other law enforcement needs. We may also share your information with other financial institutions and tax authorities if required by applicable law.
● Detect, investigate, and prevent fraudulent transactions or unauthorized or illegal activities.
● Protect our rights and property.
● Personalize your Service experience.
● Analyze the usage, improvements, and offerings of the website. Analyze and track data to determine the usefulness or popularity of certain content and better understand online user activity on our website.
● Assist in responding to your customer service requests and support needs, respond to your inquiries, or reply to your communication.
● Contact you about the Services. The email address you provide may be used to communicate information and updates related to the use of the Services. Occasionally, we may also send technical notices, support, or administrative notifications, company news, updates, promotions, and information related to products and similar services provided by us.
● Administer a contest, promotion, survey, or other features, as explained in more detail on the website.
● Link, connect, or combine the personal information we collect from or about you with other personal information.
● Carry out any other purpose or reason for which the information was collected.
We do not track a customer's activities on other websites, nor do we allow third-party data collection through our services.
If you wish to stop receiving our marketing communications, please contact us at privacy@businessshop.ai to unsubscribe.

Disclosure and Transfer of Personal Information
We may disclose your personal information to third parties and legal and regulatory authorities, and transfer your personal information as described below:

Disclosures to Third Parties
When processing your transactions, we may share some of your personal information with our external service providers who assist with our business operations. Your information will not be sold, traded, or shared with third parties without your consent, except to provide Services or as required by law. By using the website or services, you consent to the disclosure of your personal information as described in this privacy policy. Non-personally identifiable visitor information may be provided to third parties for marketing, advertising, or other uses. Our external service providers are contractually required to protect and use such information only for the purposes for which it was disclosed unless required or permitted by law. We ensure that such third parties are subject to terms no less protective than those described in this Privacy Policy or those to which we are subject under applicable data protection laws.

Disclosures to Legal Authorities
We may share your personal information with law enforcement, data protection authorities, government officials, and other authorities when:
● Required by subpoena, court order, judgments, or other legal process.
● We believe that disclosure is necessary to prevent physical harm or financial loss.
● Disclosure is necessary to report suspected illegal activity.
● Detect, investigate, and prevent fraudulent transactions or unauthorized or illegal activities.
● Disclosure is necessary to investigate violations of this privacy policy or any agreement we have with you.
International Transfers of Personal Information
We store and process your personal information in data centers worldwide, wherever our facilities or service providers are located. As such, we may transfer your personal information between such data centers. Such transfers are carried out in accordance with our legal and regulatory obligations and are only made through secure channels.
Other Circumstances for Disclosure of Personal Information
We may also disclose your personal information in the following circumstances:
● With your consent or at your direction. Certain information that you choose to share may be publicly displayed, such as your username and any content you post when using interactive areas of our website like our online forums.
● With our parent companies, affiliates, current or future subsidiaries, and with other companies under common control or ownership with us or our offices worldwide. We ensure that the listed parties are subject to terms no less protective than those described in this Privacy Policy or those to which we are subject under applicable data protection laws.
● If the exchange of personal information is necessary for the protection of our rights and property, or the rights and property of the parent companies, affiliates, current or future subsidiaries listed above, and other companies under common control or ownership with us or our offices.

External Websites
Occasionally, the website may provide references or links to other websites ("External Websites"). We do not control these third-party external websites or any of the content they contain. You agree that we are in no way responsible for external websites referenced or linked from our website, including, among other things, the website content, policies, malfunctions, promotions, products, services, or actions, and/or any damage, loss, failures, or issues caused by, related to, or arising from these websites. External websites have separate and independent privacy policies. We encourage you to review the policies, rules, terms, and regulations of each site you visit. We seek to protect the integrity of our website and appreciate any feedback on external website information provided on our website.

Your Rights Regarding Your Personal Information
Your rights regarding your personal information are fundamental and are supported by applicable legislation. You can exercise all the rights provided by law in relation to your personal data, provided that this does not conflict with legal requirements or our record-keeping and other legal obligations.
You have the following rights:
● The right to be informed about the fact that we are processing your personal information and what data we are processing exactly.
● The right to data portability. In certain circumstances, you have the right to obtain all your personal information that we store in a machine-readable format.
● The right to object to the processing of your personal information.
● The right not to be subject to automated decision-making, including profiling, if it does not interfere with the execution of the contract between you and us.
● The right to access your Personal Information, correct, update, and block inaccurate and/or incorrect data.
● The right to withdraw your consent to the processing of personal information.
● The right to delete your personal information from our servers when justifiably requested.
● And other intrinsic rights granted by law.
To exercise these rights, contact us at privacy@businessshop.ai
Within 20 days of receiving your written request (extendable by an additional 20 days if necessary), we will provide you with your personal information, including the purposes for which it was used and to whom it was disclosed in accordance with applicable law. We reserve the right to request additional information from you, which may be necessary in order to respond properly to your request in accordance with applicable law, and you agree to such a right. Additionally, if you wish to correct, update, and block inaccurate and/or incorrect data, we have the right to request confirmation of the correct data, such as official documents containing such information.
Please note that, if we cannot verify your identity via email or in your request to the call center, or in the case of reasonable doubts as to your identity, we may ask you to provide proof of identity, including personal identification with a personal appearance in our office. This is the only way we can prevent the disclosure of your personal information to someone who may violate your identity.
In some cases, we may not be able to change your personal information. In particular, such a case may include the event that your personal information has already been used in the execution of any agreement or transaction, or is specified in some official document, etc.
You have the right to withdraw consent for the processing of personal data. You can also exercise your right to be forgotten and erase your personal information from our servers. We will delete the personal data we process, except for personal data that we are obliged to store in accordance with the requirements established by applicable law.
Please note that, in the case of exercising your right to revoke consent for the processing of personal data or the right to be forgotten, we will not be able to provide you with our products or services, and we have a special right to terminate all our current agreements with you with the application of the legal consequences of such termination, and you irrevocably acknowledge this right.
To withdraw consent for the processing of personal data and/or exercise your right to be forgotten, contact us at privacy@businessshop.ai Additionally, in this case, for security reasons, we may ask you to present your identity document directly in our office.

Security of Personal Information
We use a variety of security measures to ensure the confidentiality of your personal information and to protect your personal information from loss, theft, unauthorized access, misuse, alteration, or destruction. These security measures include but are not limited to password-protected directories and databases, Secure Sockets Layered (SSL) technology to ensure that your information is fully encrypted and securely sent over the Internet. Limited access to hosting servers through 2FA and traffic encryption, incorporation of Know Your Customer (KYC) and Anti-Money Laundering (AML) procedures as an integral part of our security and compliance practices.
All financial and/or credit information is transmitted through SSL technology. Only authorized personnel can access your personal information, and this personnel is required to treat the information as highly confidential. Security measures are regularly reviewed in light of new and relevant legal and technical developments.

Retention of Personal Information
We retain personal information for as long as necessary to fulfill the purposes described in this privacy policy, subject to our own legal and regulatory obligations. In accordance with our record-keeping obligations, we will retain the account and other personal information for at least five years after the termination of the respective agreement.

Updates to This Privacy Policy
This Privacy Policy may be revised, modified, updated, and/or supplemented at any time, without prior notice, at our sole discretion. When we make changes to this privacy policy, we will notify all users on our website and make the modified privacy policy available on our site.
Any changes to this Privacy Policy will come into effect once we publish the updated terms. In all cases, your continued use of the Services or access to the Site after the publication of any updated Privacy Policy indicates your acceptance of the updated Privacy Policy.

Data Protection Officer
To exercise all relevant rights, queries, or complaints regarding any data protection matter between you and us, please first contact our Data Protection Officer at privacy@businessshop.ai.

Last updated on October 26, 2023.
`;

export const BANKS = [
  {
    code: '002',
    shorName: 'BANAMEX',
  },
  {
    code: '006',
    shorName: 'BANCOMEXT',
  },
  {
    code: '012',
    shorName: 'BBVA BANCOMER',
  },
  {
    code: '019',
    shorName: 'BANJERCITO',
  },
  {
    code: '014',
    shorName: 'SANTANDER',
  },
  {
    code: '030',
    shorName: 'BAJIO',
  },
  {
    code: '021',
    shorName: 'HSBC',
  },
  {
    code: '032',
    shorName: 'IXE',
  },

  {
    code: '036',
    shorName: 'INBURSA',
  },
  {
    code: '037',
    shorName: 'INTERACCIONES',
  },
  {
    code: '042',
    shorName: 'MIFEL',
  },
  {
    code: '044',
    shorName: 'SCOTIABANK',
  },
  {
    code: '058',
    shorName: 'BANREGIO',
  },

  {
    code: '059',
    shorName: 'INVEX',
  },
  {
    code: '060',
    shorName: 'BANSI',
  },
  {
    code: '072',
    shorName: 'BANORTE',
  },
  {
    code: '102',
    shorName: 'THE ROYAL BANK',
  },
  {
    code: '103',
    shorName: 'AMERICAN EXPRESS',
  },
  {
    code: '106',
    shorName: 'BAMSA',
  },
  {
    code: '108',
    shorName: 'TOKYO',
  },
  {
    code: '110',
    shorName: 'JP MORGAN',
  },
  {
    code: '112',
    shorName: 'BMONEX',
  },
  {
    code: '113',
    shorName: 'VE POR MAS',
  },
  {
    code: '116',
    shorName: 'ING ',
  },
  {
    code: '124',
    shorName: 'DEUTSCHE',
  },
  {
    code: '126',
    shorName: 'CREDIT SUISSE',
  },
  {
    code: '127',
    shorName: 'AZTECA',
  },
  {
    code: '128',
    shorName: 'AUTOFIN',
  },
  {
    code: '129',
    shorName: 'BARCLAYS',
  },
  {
    code: '130',
    shorName: 'COMPARTAMOS',
  },
  {
    code: '132',
    shorName: 'BANCO FAMSA',
  },
  {
    code: '133',
    shorName: 'ACTINVER',
  },
  {
    code: '134',
    shorName: 'WAL-MART',
  },
  {
    code: '135',
    shorName: 'NAFIN',
  },
  {
    code: '136',
    shorName: 'INTERBANCO',
  },
  {
    code: '137',
    shorName: 'BANCOPPEL',
  },

  {
    code: '138',
    shorName: 'ABC CAPITAL',
  },
  {
    code: '139',
    shorName: 'UBS BANK',
  },
  {
    code: '140',
    shorName: 'CONSUBANCO',
  },
  {
    code: '141',
    shorName: 'VOLKSWAGEN',
  },
  {
    code: '143',
    shorName: 'CIBANCO',
  },
  {
    code: '145',
    shorName: 'BBASE',
  },
  {
    code: '166',
    shorName: 'BANSEFI',
  },
  {
    code: '168',
    shorName: 'HIPOTECARIA FEDERAL',
  },
  {
    code: '600',
    shorName: 'MONEXCB',
  },
  {
    code: '601',
    shorName: 'GBM',
  },
  {
    code: '602',
    shorName: 'MASARI',
  },
  {
    code: '605',
    shorName: 'VALUE',
  },
  {
    code: '606',
    shorName: 'ESTRUCTURADORES',
  },
  {
    code: '607',
    shorName: 'TIBER',
  },
  {
    code: '608',
    shorName: 'VECTOR',
  },
  {
    code: '610',
    shorName: 'B&B',
  },
  {
    code: '614',
    shorName: 'ACCIVAL',
  },
  {
    code: '615',
    shorName: 'MERRILL LYNCH',
  },
  {
    code: '616',
    shorName: 'FINAMEX',
  },
  {
    code: '617',
    shorName: 'VALMEX',
  },
  {
    code: '618',
    shorName: 'UNICA',
  },
  {
    code: '619',
    shorName: 'MAPFRE',
  },
  {
    code: '620',
    shorName: 'PROFUTURO',
  },
  {
    code: '621',
    shorName: 'CB ACTINVER',
  },
  {
    code: '622',
    shorName: 'OACTIN',
  },
  {
    code: '623',
    shorName: 'SKANDIA',
  },
  {
    code: '626',
    shorName: 'CBDEUTSCHE',
  },
  {
    code: '627',
    shorName: 'ZURICH',
  },
  {
    code: '628',
    shorName: 'ZURICHVI',
  },
  {
    code: '629',
    shorName: 'SU CASITA',
  },
  {
    code: '630',
    shorName: 'CB INTERCAM',
  },
  {
    code: '631',
    shorName: 'CI BOLSA',
  },
  {
    code: '632',
    shorName: 'BULLTICK CB',
  },
  {
    code: '633',
    shorName: 'STERLING',
  },
  {
    code: '634',
    shorName: 'FINCOMUN',
  },
  {
    code: '628',
    shorName: 'ZURICHVI',
  },
  {
    code: '636',
    shorName: 'HDI SEGUROS',
  },
  {
    code: '637',
    shorName: 'ORDER',
  },
  {
    code: '638',
    shorName: 'AKALA',
  },
  {
    code: '640',
    shorName: 'CB JPMORGAN',
  },
  {
    code: '642',
    shorName: 'REFORMA',
  },
  {
    code: '646',
    shorName: 'STP',
  },
  {
    code: '647',
    shorName: 'TELECOMM',
  },
  {
    code: '648',
    shorName: 'EVERCORE',
  },
  {
    code: '649',
    shorName: 'SKANDIA',
  },
  {
    code: '651',
    shorName: 'SEGMTY',
  },
  {
    code: '652',
    shorName: 'ASEA',
  },
  {
    code: '653',
    shorName: 'KUSPIT',
  },
  {
    code: '655',
    shorName: 'SOFIEXPRESS',
  },
  {
    code: '656',
    shorName: 'UNAGRA',
  },
  {
    code: '659',
    shorName: 'OPCIONES EMPRESARIALES DEL NOROESTE',
  },
  {
    code: '902',
    shorName: 'INDEVAL',
  },
  {
    code: '901',
    shorName: 'CLS',
  },
  {
    code: '670',
    shorName: 'LIBERTAD',
  },
];
