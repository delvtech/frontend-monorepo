declare module "react-render-markup" {
  export interface MarkupProps {
    /**
     * array of tag names to allow rendering i.e.
     * const allowed = ['strong', 'em']; // strips all other elements
     * const MyComponent = (props) => {
     *   const { content } = props;
     *   return (
     *     <div>
     *       <Markup allowed={allowed} markup={content} />
     *     </div>
     *   );
     * };
     */
    allowed?: string[] | (() => string[]);

    /**
     * string of HTML you’d like to parse.
     */
    markup?: string;

    /**
     * object of elements to replace. i.e.
     *
     * const replace = {
     *   a: Link, // replace <a> elements with <Link> component
     *   em: 'strong', // replace <em> elements with <strong> elements
     *   img: null, // doesn’t render <img> elements
     * . span: React.Fragment, // unwraps contents of <span> elements
     * };

     * const MyComponent = (props) => {
     * const { content } = props;
     * return (
     *   <div>
     *     <Markup markup={content} replace={replace} />
     *   </div>
     * )};
     */
    replace?:
      | (string | React.Component)[]
      | (() => (string | React.Component)[]);

    /**
     * boolean removes whitespace text nodes when true
     */
    trim?: boolean;
  }
  export declare class Markup extends React.Component<MarkupProps> {
    static displayName: string;
    render(): JSX.Element;
  }
}
