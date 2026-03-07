import type { Schema, Struct } from '@strapi/strapi';

export interface AboutParagraph extends Struct.ComponentSchema {
  collectionName: 'components_about_paragraphs';
  info: {
    description: 'Bloco de texto da se\u00E7\u00E3o Sobre';
    displayName: 'Par\u00E1grafo';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface AboutProfile extends Struct.ComponentSchema {
  collectionName: 'components_about_profiles';
  info: {
    description: 'Card de perfil (nome, t\u00EDtulo, avatar, etc.)';
    displayName: 'Perfil';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    contactText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Github'>;
    grain: Schema.Attribute.Media<'images'>;
    handle: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Online'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    description: 'Link para rede social (GitHub, LinkedIn, etc.)';
    displayName: 'Link social';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHeaderButton extends Struct.ComponentSchema {
  collectionName: 'components_home_header_buttons';
  info: {
    description: 'Bot\u00E3o do hero (Saiba mais, Entre em contato, Baixar CV)';
    displayName: 'Bot\u00E3o do header';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface HomeRotatingText extends Struct.ComponentSchema {
  collectionName: 'components_home_rotating_texts';
  info: {
    description: 'Um texto que alterna no header (ex: forma\u00E7\u00E3o, localiza\u00E7\u00E3o)';
    displayName: 'Texto rotativo';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServicesServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_services_service_items';
  info: {
    description: 'Item de servi\u00E7o (t\u00EDtulo, descri\u00E7\u00E3o, \u00EDcone)';
    displayName: 'Servi\u00E7o';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'pi pi-globe'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServicesTechLogo extends Struct.ComponentSchema {
  collectionName: 'components_services_tech_logos';
  info: {
    description: 'Tecnologia (\u00EDcone, t\u00EDtulo, link)';
    displayName: 'Tech logo';
  };
  attributes: {
    href: Schema.Attribute.String;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Link ou bot\u00E3o (label + URL)';
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.paragraph': AboutParagraph;
      'about.profile': AboutProfile;
      'footer.social-link': FooterSocialLink;
      'home.header-button': HomeHeaderButton;
      'home.rotating-text': HomeRotatingText;
      'services.service-item': ServicesServiceItem;
      'services.tech-logo': ServicesTechLogo;
      'shared.link': SharedLink;
    }
  }
}
