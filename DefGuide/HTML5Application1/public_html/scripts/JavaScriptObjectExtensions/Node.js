window.Node = window.Node || {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
};

Node.method('isElementNode', function (element) {
    return element && element.nodeType === Node.ELEMENT_NODE;
});

Node.method('toUpperCase', function () {
    if (this.nodeType === Node.TEXT_NODE || this.nodeType === Node.CDATA_SECTION_NODE) {
        this.data = this.data.toUpperCase();
    } else {
        for (var index = 0; index < this.childNodes.length; index++) {
            this.childNodes[index].toUpperCase();
        }
    }
});