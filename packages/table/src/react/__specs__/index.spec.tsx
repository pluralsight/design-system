import { useCombinedRefs } from '@pluralsight/ps-design-system-util'
import { axe } from 'jest-axe'
import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'

import Table from '../index'
import * as stories from '../__stories__/index.story'

describe('Table', () => {
  describe('Table', () => {
    it('should forward refs', () => {
      const ref = React.createRef<HTMLTableElement>()

      render(<Table data-testid="undertest" ref={ref} />)
      const el = screen.getByTestId('undertest')

      expect(ref.current).not.toBeNull()
      expect(ref.current).toBe(el)
    })

    it('composes className', () => {
      const { container } = render(<Table className="compose-classname" />)

      expect(container.firstChild).toHaveClass(
        'compose-classname psds-theme--dark psds-table__container'
      )
    })

    describe('with a custom container', () => {
      let ref: React.RefObject<HTMLElement>

      beforeEach(() => {
        ref = React.createRef<HTMLElement>()

        const renderContainer = React.forwardRef<HTMLDivElement>(
          (props, forwardedRef) => {
            const combined = useCombinedRefs(ref, forwardedRef as any)

            return (
              <main
                className="custom class names"
                data-custom-attribute="i'm special"
                data-testid="undertest"
                ref={combined}
                {...props}
              />
            )
          }
        )

        render(
          <Table renderContainer={renderContainer}>
            <Table.Body>
              <Table.Row>
                <Table.Cell />
              </Table.Row>
            </Table.Body>
          </Table>
        )
      })

      it('should allow a custom tag', () => {
        const el = screen.getByTestId('undertest')

        expect(el).toBeInTheDocument()
        expect(el.tagName.toLowerCase()).toEqual('main')
      })

      it('should allow data attributes', () => {
        const el = screen.getByTestId('undertest')

        expect(el).toHaveAttribute('data-custom-attribute', "i'm special")
      })

      it('should allow custom refs', () => {
        const el = screen.getByTestId('undertest')

        expect(ref.current).not.toBeNull()
        expect(ref.current).toBe(el)
      })
    })
  })

  describe('Table.Body', () => {
    it('should forward refs', () => {
      const ref = React.createRef<HTMLTableSectionElement>()

      render(
        <Table>
          <Table.Body data-testid="undertest" ref={ref} />
        </Table>
      )
      const el = screen.getByTestId('undertest')

      expect(ref.current).not.toBeNull()
      expect(ref.current).toBe(el)
    })

    it('forwards className', () => {
      const { container } = render(<Table.Body className="compose-classname" />)

      expect(container.firstChild).toHaveClass('compose-classname')
    })
  })

  describe('Table.Cell', () => {
    it('should forward refs', () => {
      const ref = React.createRef<HTMLTableCellElement>()

      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell data-testid="undertest" ref={ref} />
            </Table.Row>
          </Table.Body>
        </Table>
      )
      const el = screen.getByTestId('undertest')

      expect(ref.current).not.toBeNull()
      expect(ref.current).toBe(el)
    })

    it('composes className', () => {
      const { container } = render(<Table.Cell className="compose-classname" />)

      expect(container.firstChild).toHaveClass(
        'compose-classname psds-table__cell psds-table__cell--align-left'
      )
    })
  })

  describe('Table.Head', () => {
    it('should forward refs', () => {
      const ref = React.createRef<HTMLTableSectionElement>()

      render(
        <Table>
          <Table.Head data-testid="undertest" ref={ref} />
        </Table>
      )
      const el = screen.getByTestId('undertest')

      expect(ref.current).not.toBeNull()
      expect(ref.current).toBe(el)
    })

    it('composes className', () => {
      const { container } = render(<Table.Head className="compose-classname" />)

      expect(container.firstChild).toHaveClass(
        'compose-classname psds-table__head psds-theme--dark'
      )
    })
  })

  describe('Table.Header', () => {
    it('should forward refs', () => {
      const ref = React.createRef<HTMLTableHeaderCellElement>()

      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Header
                data-testid="undertest"
                role="rowheader"
                scope="row"
                ref={ref}
                title="header title"
              />
            </Table.Row>
          </Table.Body>
        </Table>
      )
      const el = screen.getByTestId('undertest')

      expect(ref.current).not.toBeNull()
      expect(ref.current).toBe(el)
    })

    it('composes className', () => {
      const { container } = render(
        <Table.Header
          className="compose-classname"
          role="rowheader"
          scope="row"
        />
      )

      expect(container.firstChild).toHaveClass(
        'compose-classname psds-theme--dark psds-table__header psds-table__header--align-left'
      )
    })
  })

  describe('Table.Row', () => {
    it('should forward refs', () => {
      const ref = React.createRef<HTMLTableRowElement>()

      render(
        <Table>
          <Table.Body>
            <Table.Row data-testid="undertest" ref={ref}>
              <Table.Cell />
            </Table.Row>
          </Table.Body>
        </Table>
      )
      const el = screen.getByTestId('undertest')

      expect(ref.current).not.toBeNull()
      expect(ref.current).toBe(el)
    })

    it('composes className', () => {
      const { container } = render(<Table.Row className="compose-classname" />)

      expect(container.firstChild).toHaveClass(
        'compose-classname psds-theme--dark psds-table__row'
      )
    })
  })

  describe('with basic markup', () => {
    const { Basic } = stories

    it('should pass an axe a11y audit', async () => {
      const { container } = render(<Basic />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })

  describe('when sorting', () => {
    const { Sorting } = stories

    it('should pass an axe a11y audit', async () => {
      const { container } = render(<Sorting />)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('should have keyboard focusable column headers', () => {
      const { container } = render(<Sorting />)

      const head = container.querySelector('thead')!
      const headings = within(head).getAllByRole('columnheader')

      headings.forEach(h => {
        expect(h).toHaveAttribute('tabindex', '0')
      })
    })

    it('should toggle aria attributes', () => {
      const { container } = render(<Sorting />)

      const head = container.querySelector('thead')!
      const headings = within(head).getAllByRole('columnheader')

      expect(headings).toHaveLength(3)

      const [firstNameHeading] = headings
      expect(firstNameHeading).toHaveAttribute('aria-sort', 'none')
      expect(firstNameHeading).toHaveAttribute(
        'aria-label',
        expect.stringContaining('No sort applied')
      )

      fireEvent.click(firstNameHeading)
      expect(firstNameHeading).toHaveAttribute('aria-sort', 'descending')
      expect(firstNameHeading).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Descending sort applied')
      )

      fireEvent.click(firstNameHeading)
      expect(firstNameHeading).toHaveAttribute('aria-sort', 'ascending')
      expect(firstNameHeading).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Ascending sort applied')
      )
    })

    it('should have a descriptive caption', () => {
      const { container } = render(<Sorting />)

      const caption = container.querySelector('caption')!
      expect(caption).toHaveAttribute('aria-live', 'polite')

      const head = container.querySelector('thead')!
      const headings = within(head).getAllByRole('columnheader')

      const [, lastNameHeading] = headings

      expect(caption).toHaveTextContent(/not sorted/i)

      fireEvent.click(lastNameHeading)
      expect(caption).toHaveTextContent(/sorted by last name/i)
      expect(caption).toHaveTextContent(/descending/i)

      fireEvent.click(lastNameHeading)
      expect(caption).toHaveTextContent(/sorted by last name/i)
      expect(caption).toHaveTextContent(/ascending/i)
    })
  })
})
